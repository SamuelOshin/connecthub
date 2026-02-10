/**
 * Reusable Photo Grid Component.
 * Handles display, drag-and-drop, and interactions for user photos.
 * Used in Onboarding and Profile pages.
 */

'use client'

import { useState } from 'react'
import Image from 'next/image'

export interface GridPhoto {
    id: string
    url: string
    is_primary?: boolean
    is_pending?: boolean
    moderation_status?: string
}

interface PhotoGridProps {
    photos: GridPhoto[]
    maxPhotos?: number
    uploading?: boolean
    onAdd: (file: File, index: number) => void
    onRemove: (id: string) => void
    onReorder: (newOrder: string[]) => void
    onSetPrimary?: (id: string) => void
    onConfirmPending?: () => void
    onCancelPending?: () => void
    pendingSlot?: {
        photo: GridPhoto
        index: number
    } | null
}

export function PhotoGrid({
    photos,
    maxPhotos = 6,
    uploading = false,
    onAdd,
    onRemove,
    onReorder,
    onSetPrimary,
    onConfirmPending,
    onCancelPending,
    pendingSlot
}: PhotoGridProps) {
    const [draggedPhoto, setDraggedPhoto] = useState<string | null>(null)

    // Handle drag and drop
    const handleDragStart = (photoId: string) => {
        setDraggedPhoto(photoId)
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
    }

    const handleDrop = (targetPhotoId: string) => {
        if (!draggedPhoto || draggedPhoto === targetPhotoId) return

        const photoIds = photos.map(p => p.id)
        const draggedIndex = photoIds.indexOf(draggedPhoto)
        const targetIndex = photoIds.indexOf(targetPhotoId)

        // Create new order array
        const reorderedIds = [...photoIds]
        reorderedIds.splice(draggedIndex, 1)
        reorderedIds.splice(targetIndex, 0, draggedPhoto)

        onReorder(reorderedIds)
        setDraggedPhoto(null)
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0]
        if (file) onAdd(file, index)
        e.target.value = ''
    }

    // Create slots
    const photoSlots = [...Array(maxPhotos)].map((_, i) => {
        if (pendingSlot && pendingSlot.index === i) {
            return pendingSlot.photo
        }
        return photos[i] || null
    })

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
                {photoSlots.map((photo, index) => {
                    const isMain = index === 0
                    const isPending = photo?.is_pending
                    const isEmpty = !photo

                    return (
                        <div
                            key={photo?.id || `slot-${index}`}
                            className={`
                                relative rounded-2xl overflow-hidden transition-all
                                ${isMain ? 'col-span-2 row-span-2' : ''}
                                ${!isEmpty
                                    ? 'bg-gray-100 dark:bg-gray-800'
                                    : 'border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-primary dark:hover:border-primary'
                                }
                                ${draggedPhoto === photo?.id ? 'opacity-50 cursor-move scale-95' : ''}
                                aspect-[3/4]
                            `}
                            draggable={!!photo && !isPending}
                            onDragStart={() => photo && !isPending && handleDragStart(photo.id)}
                            onDragOver={handleDragOver}
                            onDrop={() => photo && !isPending && handleDrop(photo.id)}
                        >
                            {isPending ? (
                                // Pending/Preview State
                                <>
                                    <Image
                                        src={photo.url}
                                        alt="Preview"
                                        fill
                                        className="object-cover opacity-80"
                                    />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/40 backdrop-blur-[2px] z-20">
                                        {onConfirmPending && (
                                            <button
                                                onClick={onConfirmPending}
                                                disabled={uploading}
                                                className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-full shadow-lg hover:scale-105 transition-transform"
                                            >
                                                {uploading ? 'Uploading...' : 'Confirm'}
                                            </button>
                                        )}
                                        {onCancelPending && (
                                            <button
                                                onClick={onCancelPending}
                                                disabled={uploading}
                                                className="px-3 py-1.5 bg-white/20 text-white text-xs font-semibold rounded-full hover:bg-white/30 backdrop-blur-md"
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </>
                            ) : photo ? (
                                // Existing Photo
                                <>
                                    {/* Draggable overlay when hovering */}
                                    <div className={`absolute inset-0 z-10 ${draggedPhoto === photo.id ? 'bg-primary/20' : ''}`} />

                                    <Image
                                        src={photo.url}
                                        alt={`Photo ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        unoptimized // Prevent timeout for external images
                                    />

                                    {/* Primary badge */}
                                    {isMain && (
                                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-gray-900/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full z-20">
                                            Main Photo
                                        </div>
                                    )}

                                    {/* Actions overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity z-20">
                                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2">
                                            {!isMain && onSetPrimary && (
                                                <button
                                                    onClick={() => onSetPrimary(photo.id)}
                                                    className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full text-gray-800 hover:bg-yellow-100 transition-colors shadow-lg"
                                                    title="Set as main photo"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">star</span>
                                                </button>
                                            )}
                                            <button
                                                onClick={() => onRemove(photo.id)}
                                                className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full text-red-600 hover:bg-red-100 transition-colors shadow-lg"
                                                title="Delete photo"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                // Empty Slot
                                <label className="absolute inset-0 z-0 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleFileSelect(e, index)}
                                        disabled={uploading}
                                    />
                                    <span className="material-symbols-outlined text-gray-400 text-4xl">add_photo_alternate</span>
                                    <span className="text-xs text-gray-400 mt-2 font-medium">Add photo</span>
                                </label>
                            )}
                        </div>
                    )
                })}
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[14px]">info</span>
                Drag to reorder • First photo is your main profile picture
            </p>
        </div>
    )
}
