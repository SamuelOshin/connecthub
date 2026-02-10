
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { profileApi, type Profile } from '@/lib/api'
import { useState } from 'react'

// Extended Profile type to include UI-specific fields that might be missing from API
// The API doesn't return city/state text, so we'll mock it or derived it if possible
export const MOCK_PROFILE: Profile = {
    id: 'mock-user-id',
    display_name: 'Alex',
    birthdate: '1996-06-15',
    age: 28,
    gender: 'male',
    looking_for: ['female'],
    bio: "Product Designer by day, amateur chef by night. I love exploring new cities and finding the best coffee spots.",
    preferences: {
        min_age: 24,
        max_age: 35,
        distance_km: 25,
        show_me: ['female']
    },
    prompts: [
        {
            question: "A fun fact about me is...",
            answer: "I once accidentally crashed a wedding and ended up giving a toast."
        },
        {
            question: "Two truths and a lie",
            answer: "1. I've never broken a bone\n2. I can speak 3 languages\n3. I hate pizza"
        }
    ],
    is_verified: true,
    subscription_status: 'free',
    last_active: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    primary_photo_url: '', // Will fall back to placeholder in UI if empty
    passions: ['hiking', 'sushi', 'indie-rock', 'travel'],
    distance_km: 5,
    privacy_settings: {
        incognito_mode: false,
        active_status: true,
        read_receipts: true
    },
    notification_settings: {
        new_matches: true,
        new_messages: true,
        super_likes: true,
        promotions: false
    }
}

export function useProfile() {
    const [isUsingMock, setIsUsingMock] = useState(false)
    const queryClient = useQueryClient()

    const query = useQuery({
        queryKey: ['my-profile'],
        queryFn: async () => {
            try {
                // Try to fetch real data
                const data = await profileApi.getMyProfile()
                if (!data) throw new Error('Profile not found')

                setIsUsingMock(false)
                return data
            } catch (error: any) {
                // Check if it's a 404 (profile doesn't exist) vs network error
                const is404 = error?.response?.status === 404 ||
                    error?.message?.includes('404') ||
                    error?.message?.includes('Profile not found')

                if (is404) {
                    // Profile doesn't exist yet - this is expected for new users
                    // Don't use mock data, return null so UI can handle onboarding
                    console.log('Profile not found (404) - user needs to complete onboarding')
                    setIsUsingMock(false)
                    return null
                }

                // Network error or server unreachable - use mock data
                console.warn('Network error, using mock data:', error)
                setIsUsingMock(true)
                return MOCK_PROFILE
            }
        },
        retry: 1, // Don't retry too many times to fail fast to mock
    })

    const updateProfileMutation = useMutation({
        mutationFn: (data: Partial<Profile>) => {
            if (isUsingMock) {
                // Simulate network delay for mock update
                return new Promise<Profile>((resolve) => {
                    setTimeout(() => {
                        const updated = { ...MOCK_PROFILE, ...data }
                        resolve(updated)
                    }, 1000)
                })
            }
            return profileApi.updateProfile(data)
        },
        onSuccess: (newData) => {
            // Update cache
            queryClient.setQueryData(['my-profile'], (old: Profile | undefined) => ({
                ...old,
                ...newData
            }))
        }
    })

    return {
        ...query,
        isUsingMock,
        updateProfile: updateProfileMutation.mutate,
        isUpdating: updateProfileMutation.isPending,
        saveProfile: updateProfileMutation.mutateAsync
    }
}
