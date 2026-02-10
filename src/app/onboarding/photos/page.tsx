"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { PhotoGrid, GridPhoto } from "@/components/common/PhotoGrid";

const MIN_PHOTOS = 2;
const MAX_PHOTOS = 6;

interface LocalPhoto extends GridPhoto {
    file?: File;      // Only for new photos
    isLocal?: boolean; // True if not yet uploaded
    storagePath?: string; // For existing photos to delete tracking
}

export default function OnboardingPhotosPage() {
    const router = useRouter();
    const [photos, setPhotos] = useState<LocalPhoto[]>([]);
    const [originalPhotos, setOriginalPhotos] = useState<LocalPhoto[]>([]); // To track deletions
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Load existing photos on mount
    useEffect(() => {
        const loadPhotos = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) return;

            // Explicit cast for existing photos
            const { data: existingPhotos } = await supabase
                .from("photos")
                .select("*")
                .eq("user_id", user.id)
                .order("order_index") as { data: any[] | null };

            if (existingPhotos) {
                const mappedPhotos = existingPhotos.map(p => {
                    const { data } = supabase.storage.from("photos").getPublicUrl(p.storage_path);
                    return {
                        id: p.id,
                        url: data.publicUrl,
                        storagePath: p.storage_path,
                        is_primary: p.is_primary,
                        isLocal: false
                    };
                });
                setPhotos(mappedPhotos);
                setOriginalPhotos(mappedPhotos);
            }
            setLoading(false);
        };

        loadPhotos();
    }, []);

    const handleAdd = useCallback((file: File) => {
        const remainingSlots = MAX_PHOTOS - photos.length;
        if (remainingSlots <= 0) return;

        const newPhoto: LocalPhoto = {
            id: `temp-${Date.now()}-${Math.random()}`,
            url: URL.createObjectURL(file), // Local preview
            file,
            isLocal: true,
            is_primary: photos.length === 0 // First photo is primary
        };

        setPhotos(prev => [...prev, newPhoto]);
    }, [photos.length]);

    const handleRemove = (photoId: string) => {
        setPhotos(prev => {
            const photo = prev.find(p => p.id === photoId);
            if (photo?.isLocal) {
                URL.revokeObjectURL(photo.url); // Cleanup memory
            }
            return prev.filter(p => p.id !== photoId);
        });
    };

    const handleReorder = (newOrder: string[]) => {
        // Re-construct the state array based on IDs
        setPhotos(prev => {
            const map = new Map(prev.map(p => [p.id, p]));
            return newOrder.map(id => map.get(id)).filter(Boolean) as LocalPhoto[];
        });
    };

    const handleContinue = async () => {
        if (photos.length < MIN_PHOTOS) {
            setError(`Please upload at least ${MIN_PHOTOS} photos`);
            return;
        }

        setSubmitting(true);
        setError(null);

        try {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push("/sign-in");
                return;
            }

            // 1. Delete removed photos
            const currentIds = new Set(photos.map(p => p.id));
            const photosToDelete = originalPhotos.filter(p => !currentIds.has(p.id));

            for (const photo of photosToDelete) {
                if (photo.storagePath) {
                    await supabase.storage.from("photos").remove([photo.storagePath]);
                    await supabase.from("photos").delete().eq("id", photo.id);
                }
            }

            // 2. Upload new photos and update order
            const updatedPhotos = [...photos];

            for (let i = 0; i < updatedPhotos.length; i++) {
                const photo = updatedPhotos[i];
                let photoId = photo.id;
                let storagePath = photo.storagePath;

                // Upload if local
                if (photo.isLocal && photo.file) {
                    const fileExt = photo.file.name.split('.').pop()?.toLowerCase() || 'jpg';
                    const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

                    const { error: uploadError } = await supabase.storage
                        .from("photos")
                        .upload(fileName, photo.file, {
                            cacheControl: "3600",
                            upsert: false,
                        });

                    if (uploadError) throw uploadError;

                    storagePath = fileName;

                    // Insert into DB
                    const { data: newRecord, error: insertError } = await (supabase
                        .from("photos") as any)
                        .insert({
                            user_id: user.id,
                            storage_path: fileName,
                            order_index: i,
                            is_primary: i === 0
                        })
                        .select()
                        .single();

                    if (insertError) throw insertError;

                    photoId = newRecord.id;
                } else {
                    // Existing photo: Update order and is_primary
                    await (supabase
                        .from("photos") as any)
                        .update({
                            order_index: i,
                            is_primary: i === 0
                        })
                        .eq("id", photoId);
                }
            }

            // Success!
            router.push("/onboarding/bio");

        } catch (err: any) {
            console.error("Error saving photos:", err);
            setError(err.message || "Failed to save photos. Please try again.");
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-white dark:bg-[#1a2733] rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Add your photos
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Add at least {MIN_PHOTOS} photos to continue. You can add up to {MAX_PHOTOS}.
                </p>
            </div>

            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm mb-6">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="flex justify-center p-8">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <div className="mb-8">
                    <PhotoGrid
                        photos={photos}
                        onAdd={(file) => handleAdd(file)}
                        onRemove={handleRemove}
                        onReorder={handleReorder}
                        maxPhotos={MAX_PHOTOS}
                    />
                </div>
            )}

            <div className="flex gap-3">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="flex-1 py-6"
                    disabled={submitting}
                >
                    Back
                </Button>
                <Button
                    type="button"
                    onClick={handleContinue}
                    disabled={submitting || loading || photos.length < MIN_PHOTOS}
                    className="flex-1 py-6 text-lg font-semibold"
                >
                    {submitting ? "Saving..." : "Continue"}
                </Button>
            </div>

            <p className="text-center text-xs text-gray-500 mt-4">
                {photos.length}/{MAX_PHOTOS} photos · {MIN_PHOTOS} minimum required
            </p>
        </div>
    );
}

