/**
 * Photo Upload Component with drag-and-drop and grid management.
 */

'use client'

import { useState, useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { photosApi } from '@/lib/api'
import { Plus, X, Star, GripVertical, Loader2 } from 'lucide-react'
import Image from 'next/image'

interface Photo {
    id: string
    url: string
    order_index: number
    is_primary: boolean
    moderation_status: string
}

export function PhotoUpload() {
    const queryClient = useQueryClient()
    const [uploading, setUploading] = useState(false)
    const [draggedPhoto, setDraggedPhoto] = useState<string | null>(null)

    // Fetch photos
    const { data: photos = [], isLoading } = useQuery({
        queryKey: ['my-photos'],
        queryFn: () => photosApi.getMyPhotos(),
    })

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: (photoId: string) => photosApi.deletePhoto(photoId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-photos'] })
        },
    })

    // Set primary mutation
    const setPrimaryMutation = useMutation({
        mutationFn: (photoId: string) => photosApi.updatePhoto(photoId, { is_primary: true }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-photos'] })
        },
    })

    // Reorder mutation
    const reorderMutation = useMutation({
        mutationFn: (photoIds: string[]) => photosApi.reorderPhotos(photoIds),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-photos'] })
        },
    })

    // Handle file upload
    const handleUpload = useCallback(async (file: File) => {
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file')
            return
        }

        if (file.size > 10 * 1024 * 1024) {
            alert('Image must be less than 10MB')
            return
        }

        setUploading(true)
        try {
            // Get signed upload URL
            const { upload_url, storage_path } = await photosApi.getUploadUrl()

            // Upload to Supabase Storage
            const uploadRes = await fetch(upload_url, {
                method: 'PUT',
                headers: { 'Content-Type': file.type },
                body: file,
            })

            if (!uploadRes.ok) throw new Error('Upload failed')

            // Create photo record
            await photosApi.createPhoto(storage_path, photos.length, photos.length === 0)

            queryClient.invalidateQueries({ queryKey: ['my-photos'] })
        } catch (error) {
            console.error('Upload error:', error)
            alert(error instanceof Error ? error.message : 'Failed to upload photo')
        } finally {
            setUploading(false)
        }
    }, [photos.length, queryClient])

    // Handle drag and drop
    const handleDragStart = (photoId: string) => {
        setDraggedPhoto(photoId)
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
    }

    const handleDrop = (targetPhotoId: string) => {
        if (!draggedPhoto || draggedPhoto === targetPhotoId) return

        const photoIds = photos.map((p: Photo) => p.id)
        const draggedIndex = photoIds.indexOf(draggedPhoto)
        const targetIndex = photoIds.indexOf(targetPhotoId)

        // Reorder
        photoIds.splice(draggedIndex, 1)
        photoIds.splice(targetIndex, 0, draggedPhoto)

        reorderMutation.mutate(photoIds)
        setDraggedPhoto(null)
    }

    // Handle file input change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) handleUpload(file)
        e.target.value = '' // Reset input
    }

    if (isLoading) {
        return (
            <div className="grid grid-cols-3 gap-3">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="aspect-[3/4] bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
                ))}
            </div>
        )
    }

    const photoSlots = [...Array(6)].map((_, i) => photos[i] || null)

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#111418] dark:text-white">
                    Photos
                </h3>
                <span className="text-sm text-[#60758a] dark:text-gray-400">
                    {photos.length}/6 • Drag to reorder
                </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
                {photoSlots.map((photo: Photo | null, index: number) => (
                    <div
                        key={photo?.id || `slot-${index}`}
                        className={`
              relative aspect-[3/4] rounded-xl overflow-hidden
              ${photo ? 'bg-gray-100 dark:bg-gray-800' : 'border-2 border-dashed border-gray-300 dark:border-gray-700'}
              ${draggedPhoto === photo?.id ? 'opacity-50' : ''}
              transition-all
            `}
                        draggable={!!photo}
                        onDragStart={() => photo && handleDragStart(photo.id)}
                        onDragOver={handleDragOver}
                        onDrop={() => photo && handleDrop(photo.id)}
                    >
                        {photo ? (
                            <>
                                {/* Photo */}
                                <Image
                                    src={photo.url}
                                    alt={`Photo ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />

                                {/* Primary badge */}
                                {photo.is_primary && (
                                    <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-current" />
                                        Main
                                    </div>
                                )}

                                {/* Moderation status */}
                                {photo.moderation_status === 'pending' && (
                                    <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        Review
                                    </div>
                                )}

                                {/* Actions overlay */}
                                <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors group">
                                    <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {!photo.is_primary && (
                                            <button
                                                onClick={() => setPrimaryMutation.mutate(photo.id)}
                                                className="p-2 bg-white rounded-full text-gray-800 hover:bg-yellow-100 transition-colors"
                                                title="Set as main photo"
                                            >
                                                <Star className="w-5 h-5" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteMutation.mutate(photo.id)}
                                            className="p-2 bg-white rounded-full text-red-600 hover:bg-red-100 transition-colors"
                                            title="Delete photo"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {/* Drag handle */}
                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <GripVertical className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                            </>
                        ) : (
                            // Empty slot - upload button
                            <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    disabled={uploading || photos.length >= 6}
                                />
                                {uploading && index === photos.length ? (
                                    <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                                ) : (
                                    <>
                                        <Plus className="w-8 h-8 text-gray-400" />
                                        <span className="text-xs text-gray-400 mt-1">Add photo</span>
                                    </>
                                )}
                            </label>
                        )}
                    </div>
                ))}
            </div>

            <p className="text-xs text-[#60758a] dark:text-gray-400 text-center">
                First photo is your main profile picture • Max 10MB per photo
            </p>
        </div>
    )
}
