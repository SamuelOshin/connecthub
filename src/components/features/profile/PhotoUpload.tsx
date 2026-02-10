/**
 * Photo Upload Component using reusable PhotoGrid.
 * Manages state for Profile page uploads (Preview -> Confirm).
 */

'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { photosApi, Photo } from '@/lib/api'
import { createClient } from '@/lib/supabase/client'
import { PhotoGrid, GridPhoto } from '@/components/common/PhotoGrid'

interface PendingUpload {
    file: File
    previewUrl: string
    slotIndex: number
}

export function PhotoUpload() {
    const queryClient = useQueryClient()
    const supabase = createClient()
    const [uploading, setUploading] = useState(false)
    const [pendingUpload, setPendingUpload] = useState<PendingUpload | null>(null)

    // Fetch photos
    const { data: fetchedPhotos, isLoading } = useQuery({
        queryKey: ['my-photos'],
        queryFn: () => photosApi.getMyPhotos(),
    })

    // Ensure photos is always an array
    const photos = Array.isArray(fetchedPhotos) ? fetchedPhotos : []

    // Mutations
    const deleteMutation = useMutation({
        mutationFn: (photoId: string) => photosApi.deletePhoto(photoId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['my-photos'] }),
    })

    const setPrimaryMutation = useMutation({
        mutationFn: (photoId: string) => photosApi.updatePhoto(photoId, { is_primary: true }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['my-photos'] }),
    })

    const reorderMutation = useMutation({
        mutationFn: (photoIds: string[]) => photosApi.reorderPhotos(photoIds),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['my-photos'] }),
    })

    // 1. Initial File Select -> Set Pending
    const handleAdd = (file: File, index: number) => {
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file')
            return
        }
        if (file.size > 10 * 1024 * 1024) {
            alert('Image must be less than 10MB')
            return
        }

        const previewUrl = URL.createObjectURL(file)
        setPendingUpload({ file, previewUrl, slotIndex: index })
    }

    // 2. Cancel
    const cancelUpload = () => {
        if (pendingUpload) {
            URL.revokeObjectURL(pendingUpload.previewUrl)
            setPendingUpload(null)
        }
    }

    // 3. Confirm & Upload
    const confirmUpload = async () => {
        if (!pendingUpload) return
        setUploading(true)

        try {
            const { file } = pendingUpload
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error("Not authenticated")

            const fileExt = file.name.split('.').pop()
            const fileName = `${crypto.randomUUID()}.${fileExt}`
            const filePath = `${user.id}/${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('photos')
                .upload(filePath, file)

            if (uploadError) throw uploadError

            await photosApi.createPhoto(filePath, photos.length, photos.length === 0)

            queryClient.invalidateQueries({ queryKey: ['my-photos'] })
            setPendingUpload(null)
        } catch (error) {
            console.error('Upload error:', error)
            alert(error instanceof Error ? error.message : 'Failed to upload photo')
        } finally {
            setUploading(false)
        }
    }

    // Construct the array of existing photos (guaranteed dense by API usually)
    const gridPhotos: GridPhoto[] = photos.map(p => ({
        id: p.id,
        url: p.url,
        is_primary: p.is_primary,
        moderation_status: p.moderation_status
    }))

    // Prepare pending slot if exists
    const pendingSlot = pendingUpload ? {
        index: pendingUpload.slotIndex,
        photo: {
            id: 'pending-upload',
            url: pendingUpload.previewUrl,
            is_pending: true
        } as GridPhoto
    } : null

    if (isLoading) {
        return (
            <div className="grid grid-cols-3 gap-3">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className={`aspect-[3/4] bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
                    />
                ))}
            </div>
        )
    }

    return (
        <PhotoGrid
            photos={gridPhotos}
            onAdd={handleAdd}
            onRemove={(id) => deleteMutation.mutate(id)}
            onReorder={(newOrder) => reorderMutation.mutate(newOrder)}
            onSetPrimary={(id) => setPrimaryMutation.mutate(id)}
            uploading={uploading}
            // Pending actions
            onConfirmPending={confirmUpload}
            onCancelPending={cancelUpload}
            pendingSlot={pendingSlot}
        />
    )
}
