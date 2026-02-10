'use client';

import { useState } from 'react';
import { useSubscription, SubscriptionPlan } from '@/hooks/useSubscription';
import { Button } from '@/components/ui/button';

export default function PremiumPlansPage() {
    const {
        plans,
        isLoadingPlans,
        subscription,
        currentPlanName,
        createCheckout,
        isCreatingCheckout,
    } = useSubscription();

    const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly');
    const [processingPlanId, setProcessingPlanId] = useState<string | null>(null);

    const getPrice = (plan: SubscriptionPlan) => {
        if (plan.name === 'basic') return 'Free';
        const price = billingInterval === 'monthly'
            ? plan.price_monthly
            : (plan.price_yearly / 12);
        return `$${price.toFixed(2)}`;
    };

    const getPriceLabel = (plan: SubscriptionPlan) => {
        if (plan.name === 'basic') return 'forever';
        return '/mo';
    };

    const handleSelectPlan = async (plan: SubscriptionPlan) => {
        if (plan.name === 'basic' || plan.name === currentPlanName) return;

        setProcessingPlanId(plan.id);
        try {
            const result = await createCheckout({
                planId: plan.id,
                billingInterval,
            });

            if (result.checkout_url) {
                // In production, redirect to Stripe
                window.open(result.checkout_url, '_blank');
            }
        } catch (error) {
            console.error('Checkout failed:', error);
        } finally {
            setProcessingPlanId(null);
        }
    };

    const isCurrentPlan = (plan: SubscriptionPlan) => plan.name === currentPlanName;

    if (isLoadingPlans) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
            <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-10">
                {/* Hero Section */}
                <div className="mb-12 flex flex-col items-center gap-4 text-center">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-5xl">
                        Upgrade Your Dating Life
                    </h1>
                    <p className="max-w-2xl text-lg text-gray-500 dark:text-gray-400">
                        Unlock exclusive features to find your perfect match faster. Choose the plan that fits your journey.
                    </p>

                    {/* Billing Toggle */}
                    <div className="mt-6 flex w-fit rounded-full bg-gray-200 p-1 dark:bg-gray-800">
                        <label className="cursor-pointer">
                            <input
                                type="radio"
                                name="billing"
                                value="monthly"
                                checked={billingInterval === 'monthly'}
                                onChange={() => setBillingInterval('monthly')}
                                className="peer sr-only"
                            />
                            <div className="rounded-full px-6 py-2 text-sm font-semibold text-gray-500 transition-all peer-checked:bg-white peer-checked:text-gray-900 peer-checked:shadow-sm dark:peer-checked:bg-primary dark:peer-checked:text-white">
                                Monthly
                            </div>
                        </label>
                        <label className="cursor-pointer">
                            <input
                                type="radio"
                                name="billing"
                                value="yearly"
                                checked={billingInterval === 'yearly'}
                                onChange={() => setBillingInterval('yearly')}
                                className="peer sr-only"
                            />
                            <div className="flex items-center gap-2 rounded-full px-6 py-2 text-sm font-semibold text-gray-500 transition-all peer-checked:bg-white peer-checked:text-gray-900 peer-checked:shadow-sm dark:peer-checked:bg-primary dark:peer-checked:text-white">
                                Yearly
                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] text-green-700 dark:bg-green-900 dark:text-green-300">
                                    Save 20%
                                </span>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Plan Cards */}
                <div className="mb-16 grid grid-cols-1 items-start gap-6 md:grid-cols-3 lg:gap-8">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`group relative flex flex-col rounded-xl p-6 shadow-sm transition-all ${plan.name === 'premium'
                                ? 'z-10 border-2 border-primary bg-surface-light shadow-xl shadow-primary/10 dark:bg-surface-dark md:-translate-y-4'
                                : 'border border-gray-200 bg-surface-light hover:shadow-md dark:border-gray-800 dark:bg-surface-dark'
                                }`}
                        >
                            {/* Most Popular Badge */}
                            {plan.name === 'premium' && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
                                    Most Popular
                                </div>
                            )}

                            {/* Plan Name & Price */}
                            <div className="mb-5">
                                <h3 className={`mb-2 text-lg font-bold ${plan.name === 'premium' ? 'text-primary' : 'text-gray-900 dark:text-white'
                                    }`}>
                                    {plan.display_name}
                                </h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
                                        {getPrice(plan)}
                                    </span>
                                    <span className="font-medium text-gray-500 dark:text-gray-400">
                                        {getPriceLabel(plan)}
                                    </span>
                                </div>
                            </div>

                            {/* CTA Button */}
                            {isCurrentPlan(plan) ? (
                                <Button
                                    variant="outline"
                                    className="mb-6 w-full cursor-default rounded-full bg-gray-100 py-3 text-sm font-bold text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                                    disabled
                                >
                                    Current Plan
                                </Button>
                            ) : plan.name === 'basic' ? (
                                <Button
                                    variant="outline"
                                    className="mb-6 w-full rounded-full py-3 text-sm font-bold"
                                    disabled
                                >
                                    Free Forever
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => handleSelectPlan(plan)}
                                    disabled={processingPlanId !== null}
                                    className={`mb-6 w-full rounded-full py-3 text-sm font-bold transition-all ${plan.name === 'premium'
                                        ? 'bg-primary text-white shadow-lg shadow-primary/25 hover:bg-blue-600'
                                        : 'border border-gray-200 bg-gray-50 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700'
                                        }`}
                                >
                                    {processingPlanId === plan.id ? 'Loading...' : `Select ${plan.display_name}`}
                                </Button>
                            )}

                            {/* Features List */}
                            <div className="flex-1 space-y-4">
                                {plan.features.map((feature, index) => {
                                    const isExcluded = feature.toLowerCase().includes('see who likes') && !plan.has_see_likes;
                                    return (
                                        <div
                                            key={index}
                                            className={`flex gap-3 text-sm ${isExcluded
                                                ? 'text-gray-400 line-through decoration-gray-400/50 dark:text-gray-600'
                                                : plan.name === 'premium'
                                                    ? 'font-medium text-gray-700 dark:text-gray-200'
                                                    : 'text-gray-600 dark:text-gray-300'
                                                }`}
                                        >
                                            <span className={`material-symbols-outlined text-[20px] ${isExcluded
                                                ? 'text-gray-300 dark:text-gray-600'
                                                : 'text-primary'
                                                }`}>
                                                {isExcluded ? 'cancel' : 'check_circle'}
                                            </span>
                                            <span>{feature}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Current Subscription Info */}
                {subscription && subscription.plan.name !== 'basic' && (
                    <div className="mx-auto max-w-2xl mb-16">
                        <div className="rounded-xl border border-gray-200 bg-surface-light p-6 shadow-sm dark:border-gray-800 dark:bg-surface-dark">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="material-symbols-outlined text-primary">verified</span>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Your Subscription
                                </h2>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">Plan</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">
                                        {subscription.plan.display_name}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">Status</p>
                                    <p className={`font-semibold ${subscription.status === 'active'
                                        ? 'text-green-600'
                                        : 'text-amber-600'
                                        }`}>
                                        {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                                    </p>
                                </div>
                                {subscription.billing_interval && (
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400">Billing</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {subscription.billing_interval.charAt(0).toUpperCase() + subscription.billing_interval.slice(1)}
                                        </p>
                                    </div>
                                )}
                                {subscription.current_period_end && (
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400">Renews</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {new Date(subscription.current_period_end).toLocaleDateString()}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="border-t border-gray-200 py-6 text-center dark:border-gray-800">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        © 2026 ConnectHub. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
