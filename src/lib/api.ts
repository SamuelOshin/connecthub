/**
 * API client for profile and photo operations.
 * Handles standardized response format from backend.
 */

import { createClient } from '@/lib/supabase/client'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// ============================================================================
// Types
// ============================================================================

interface ApiSuccessResponse<T = unknown> {
    status: 'SUCCESS'
    status_code: number
    message: string
    data: T
}

interface ApiErrorResponse {
    error_code: string
    message: string
    status_code: number
    errors: Record<string, string[]>
}

export class ApiError extends Error {
    code: string
    statusCode: number
    errors: Record<string, string[]>

    constructor(response: ApiErrorResponse) {
        super(response.message)
        this.name = 'ApiError'
        this.code = response.error_code
        this.statusCode = response.status_code
        this.errors = response.errors || {}
    }
}

// ============================================================================
// Core API utilities
// ============================================================================

async function getAuthHeaders(): Promise<Record<string, string>> {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session?.access_token) {
        throw new ApiError({
            error_code: 'NOT_AUTHENTICATED',
            message: 'You must be logged in to perform this action',
            status_code: 401,
            errors: {},
        })
    }

    return {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
    }
}

/**
 * Make an authenticated API request and handle standardized responses.
 */
async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const headers = await getAuthHeaders()

    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            ...headers,
            ...options.headers,
        },
    })

    // Handle 204 No Content (e.g., DELETE)
    if (res.status === 204) {
        return undefined as T
    }

    const json = await res.json()

    // Check if it's an error response
    if (!res.ok) {
        // New standardized error format
        if (json.error_code) {
            throw new ApiError(json as ApiErrorResponse)
        }
        // Legacy error format (FastAPI default)
        if (json.detail) {
            throw new ApiError({
                error_code: 'API_ERROR',
                message: typeof json.detail === 'string' ? json.detail : 'Request failed',
                status_code: res.status,
                errors: {},
            })
        }
        throw new Error('Unknown error')
    }

    // New standardized success format: extract data from wrapper
    if (json.status === 'SUCCESS' && 'data' in json) {
        return json.data as T
    }

    // Direct response (for endpoints not yet using standardized format)
    return json as T
}

// ============================================================================
// Profile API
// ============================================================================

export interface Profile {
    id: string
    display_name: string | null
    birthdate: string
    gender: string | null
    looking_for: string[]
    bio: string | null
    preferences: {
        min_age: number
        max_age: number
        distance_km: number
        show_me: string[]
    }
    prompts: { question: string; answer: string }[]
    is_verified: boolean
    subscription_status: string
    last_active: string
    created_at: string
    updated_at: string
    age?: number
    distance_km?: number
    primary_photo_url?: string
}

export const profileApi = {
    async getMyProfile(): Promise<Profile | null> {
        try {
            return await apiRequest<Profile>('/api/v1/profiles/me')
        } catch (error) {
            if (error instanceof ApiError && error.statusCode === 404) {
                return null
            }
            throw error
        }
    },

    async createProfile(data: {
        display_name?: string
        birthdate: string
        gender?: string
        looking_for?: string[]
        bio?: string
    }): Promise<Profile> {
        return apiRequest<Profile>('/api/v1/profiles/me', {
            method: 'POST',
            body: JSON.stringify(data),
        })
    },

    async updateProfile(data: {
        display_name?: string
        gender?: string
        looking_for?: string[]
        bio?: string
        preferences?: {
            min_age?: number
            max_age?: number
            distance_km?: number
            show_me?: string[]
        }
        prompts?: { question: string; answer: string }[]
    }): Promise<Profile> {
        return apiRequest<Profile>('/api/v1/profiles/me', {
            method: 'PATCH',
            body: JSON.stringify(data),
        })
    },

    async updateLocation(latitude: number, longitude: number): Promise<{ status: string }> {
        return apiRequest('/api/v1/profiles/me/location', {
            method: 'PUT',
            body: JSON.stringify({ latitude, longitude }),
        })
    },

    async heartbeat(): Promise<void> {
        await apiRequest('/api/v1/profiles/me/heartbeat', {
            method: 'POST',
        })
    },
}

// ============================================================================
// Photos API
// ============================================================================

export interface Photo {
    id: string
    user_id: string
    storage_path: string
    order_index: number
    is_primary: boolean
    moderation_status: string
    created_at: string
    url: string
}

export interface UploadUrlResponse {
    upload_url: string
    storage_path: string
    expires_in: number
}

export const photosApi = {
    async getMyPhotos(): Promise<Photo[]> {
        return apiRequest<Photo[]>('/api/v1/photos')
    },

    async getUploadUrl(): Promise<UploadUrlResponse> {
        return apiRequest<UploadUrlResponse>('/api/v1/photos/upload-url', {
            method: 'POST',
        })
    },

    async createPhoto(
        storage_path: string,
        order_index = 0,
        is_primary = false
    ): Promise<Photo> {
        return apiRequest<Photo>('/api/v1/photos', {
            method: 'POST',
            body: JSON.stringify({ storage_path, order_index, is_primary }),
        })
    },

    async updatePhoto(
        photoId: string,
        data: { order_index?: number; is_primary?: boolean }
    ): Promise<Photo> {
        return apiRequest<Photo>(`/api/v1/photos/${photoId}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        })
    },

    async reorderPhotos(photoIds: string[]): Promise<Photo[]> {
        return apiRequest<Photo[]>('/api/v1/photos/reorder', {
            method: 'POST',
            body: JSON.stringify({ photo_ids: photoIds }),
        })
    },

    async deletePhoto(photoId: string): Promise<void> {
        await apiRequest(`/api/v1/photos/${photoId}`, {
            method: 'DELETE',
        })
    },
}
