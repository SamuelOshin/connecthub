'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export interface SubscriptionPlan {
    id: string;
    name: string;
    display_name: string;
    price_monthly: number;
    price_yearly: number;
    features: string[];
    swipe_limit: number | null;
    super_likes_weekly: number;
    has_see_likes: boolean;
    has_priority_placement: boolean;
    has_read_receipts: boolean;
    has_monthly_boost: boolean;
    sort_order: number;
}

export interface UserSubscription {
    id: string;
    user_id: string;
    plan: SubscriptionPlan;
    status: 'active' | 'canceled' | 'past_due' | 'trialing';
    billing_interval: 'monthly' | 'yearly' | null;
    current_period_start: string | null;
    current_period_end: string | null;
    canceled_at: string | null;
    created_at: string;
}

async function getAuthHeaders() {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token || ''}`,
    };
}

/**
 * Hook for subscription management.
 * Handles plan listing, current subscription, checkout, and cancellation.
 */
export function useSubscription() {
    const queryClient = useQueryClient();

    // Fetch all available plans
    const plansQuery = useQuery({
        queryKey: ['subscription-plans'],
        queryFn: async (): Promise<SubscriptionPlan[]> => {
            const headers = await getAuthHeaders();
            const response = await fetch(`${API_URL}/subscriptions/plans`, { headers });

            if (!response.ok) {
                throw new Error('Failed to fetch plans');
            }

            const json = await response.json();
            return json.data?.plans || [];
        },
        staleTime: 1000 * 60 * 10, // Cache for 10 minutes
    });

    // Fetch current user subscription
    const subscriptionQuery = useQuery({
        queryKey: ['my-subscription'],
        queryFn: async (): Promise<UserSubscription | null> => {
            const headers = await getAuthHeaders();
            const response = await fetch(`${API_URL}/subscriptions/me`, { headers });

            if (!response.ok) {
                throw new Error('Failed to fetch subscription');
            }

            const json = await response.json();
            return json.data?.subscription || null;
        },
        staleTime: 1000 * 60, // Cache for 1 minute
    });

    // Create checkout session
    const checkoutMutation = useMutation({
        mutationFn: async ({
            planId,
            billingInterval
        }: {
            planId: string;
            billingInterval: 'monthly' | 'yearly';
        }) => {
            const headers = await getAuthHeaders();
            const response = await fetch(`${API_URL}/subscriptions/checkout`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    plan_id: planId,
                    billing_interval: billingInterval,
                    success_url: `${window.location.origin}/premium?success=true`,
                    cancel_url: `${window.location.origin}/premium?canceled=true`,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create checkout session');
            }

            const json = await response.json();
            return json.data;
        },
    });

    // Cancel subscription
    const cancelMutation = useMutation({
        mutationFn: async () => {
            const headers = await getAuthHeaders();
            const response = await fetch(`${API_URL}/subscriptions/cancel`, {
                method: 'POST',
                headers,
            });

            if (!response.ok) {
                throw new Error('Failed to cancel subscription');
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-subscription'] });
        },
    });

    // Get customer portal URL
    const portalMutation = useMutation({
        mutationFn: async () => {
            const headers = await getAuthHeaders();
            const response = await fetch(`${API_URL}/subscriptions/portal`, { headers });

            if (!response.ok) {
                throw new Error('Failed to get portal URL');
            }

            const json = await response.json();
            return json.data;
        },
    });

    return {
        // Plans
        plans: plansQuery.data || [],
        isLoadingPlans: plansQuery.isLoading,

        // Current subscription
        subscription: subscriptionQuery.data,
        isLoadingSubscription: subscriptionQuery.isLoading,
        currentPlanName: subscriptionQuery.data?.plan?.name || 'basic',
        isPremium: subscriptionQuery.data?.plan?.name === 'premium',
        isElite: subscriptionQuery.data?.plan?.name === 'elite',
        isPaid: subscriptionQuery.data?.plan?.name !== 'basic',

        // Actions
        createCheckout: checkoutMutation.mutateAsync,
        isCreatingCheckout: checkoutMutation.isPending,

        cancelSubscription: cancelMutation.mutateAsync,
        isCanceling: cancelMutation.isPending,

        openPortal: portalMutation.mutateAsync,
        isOpeningPortal: portalMutation.isPending,

        // Refetch
        refetchSubscription: subscriptionQuery.refetch,
    };
}
