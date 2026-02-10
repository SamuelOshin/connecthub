'use client';

import { Button } from '@/components/ui/button';
import { useProfile } from '@/hooks/useProfile';
import { useSubscription } from '@/hooks/useSubscription';

export default function BillingSettingsPage() {
    const { data: profile, isLoading: isProfileLoading } = useProfile();
    const {
        subscription,
        isLoadingSubscription,
        isPaid,
        cancelSubscription,
        isCanceling,
        openPortal,
        isOpeningPortal
    } = useSubscription();

    // Format date for display
    const formatDate = (dateString: string | null | undefined) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Get price based on billing interval
    const getCurrentPrice = () => {
        if (!subscription?.plan) return '$0.00';
        const price = subscription.billing_interval === 'yearly'
            ? subscription.plan.price_yearly
            : subscription.plan.price_monthly;
        return `$${price?.toFixed(2) || '0.00'}`;
    };

    // Get billing cycle text
    const getBillingCycle = () => {
        if (!subscription?.billing_interval) return '';
        return subscription.billing_interval === 'yearly' ? '/ year' : '/ month';
    };

    const handleManageSubscription = async () => {
        try {
            const result = await openPortal();
            if (result?.portal_url) {
                window.open(result.portal_url, '_blank');
            }
        } catch (error) {
            console.error('Failed to open portal:', error);
        }
    };

    const handleCancelSubscription = async () => {
        if (confirm('Are you sure you want to cancel your subscription? You will retain access until the end of your billing period.')) {
            try {
                await cancelSubscription();
            } catch (error) {
                console.error('Failed to cancel:', error);
            }
        }
    };

    // Profile photo - use index 0 from photos array or primary_photo_url
    const profilePhoto = profile?.primary_photo_url || '/placeholder-avatar.png';

    // Loading state
    if (isProfileLoading || isLoadingSubscription) {
        return (
            <div className="p-4 sm:p-8 max-w-4xl mx-auto">
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            {/* Page Header with Profile */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 sm:mb-8 text-center sm:text-left">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary shadow-lg shrink-0">
                    <img
                        src={profilePhoto}
                        alt={profile?.display_name || 'Profile'}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        Billing & Subscription
                    </h1>
                    <p className="text-gray-500 text-sm sm:text-base">
                        Manage your subscription plan, payment details, and view your billing history.
                    </p>
                </div>
            </div>

            {/* Current Plan */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-soft">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[22px] icon-filled">diamond</span>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Current Plan</h2>
                    </div>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${subscription?.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : subscription?.status === 'canceled'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                        {subscription?.status?.toUpperCase() || 'FREE'}
                    </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                            ConnectHub {subscription?.plan?.display_name || 'Basic'}
                        </h3>
                        <div className="flex items-baseline gap-1 mb-2">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                {getCurrentPrice()}
                            </span>
                            <span className="text-gray-500">{getBillingCycle()}</span>
                        </div>
                        {subscription?.current_period_end && (
                            <p className="text-sm text-gray-500">
                                {subscription.status === 'canceled'
                                    ? `Access until: ${formatDate(subscription.current_period_end)}`
                                    : `Next billing date: ${formatDate(subscription.current_period_end)}`
                                }
                            </p>
                        )}
                        {!isPaid && (
                            <p className="text-sm text-gray-500">
                                Free plan - Upgrade to unlock premium features
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                        {isPaid && subscription?.status === 'active' && (
                            <Button
                                variant="outline"
                                className="rounded-xl w-full sm:w-auto"
                                onClick={handleCancelSubscription}
                                disabled={isCanceling}
                            >
                                {isCanceling ? 'Canceling...' : 'Cancel Plan'}
                            </Button>
                        )}
                        {isPaid ? (
                            <Button
                                className="bg-primary hover:bg-blue-600 text-white rounded-xl w-full sm:w-auto"
                                onClick={handleManageSubscription}
                                disabled={isOpeningPortal}
                            >
                                {isOpeningPortal ? 'Loading...' : 'Manage Subscription'}
                            </Button>
                        ) : (
                            <Button
                                className="bg-primary hover:bg-blue-600 text-white rounded-xl w-full sm:w-auto h-12 sm:h-10"
                                onClick={() => window.location.href = '/premium'}
                            >
                                Upgrade Plan
                            </Button>
                        )}
                    </div>
                </div>

                {/* Plan Features */}
                {subscription?.plan?.features && subscription.plan.features.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Your Plan Includes:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {subscription.plan.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <span className="material-symbols-outlined text-green-500 text-[16px]">check_circle</span>
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Payment Methods - Only show for paid users */}
            {isPaid && (
                <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-soft">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-purple-500 text-[22px]">credit_card</span>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Payment Methods</h2>
                        </div>
                        <button
                            onClick={handleManageSubscription}
                            className="text-primary text-sm font-bold flex items-center gap-1 hover:underline"
                        >
                            <span className="material-symbols-outlined text-[18px]">settings</span>
                            <span className="hidden sm:inline">Manage in Portal</span>
                            <span className="sm:hidden">Manage</span>
                        </button>
                    </div>

                    <div className="text-center py-8 text-gray-500">
                        <span className="material-symbols-outlined text-4xl mb-2">credit_card</span>
                        <p className="text-sm sm:text-base">Payment methods are managed through our secure payment portal.</p>
                        <Button
                            variant="outline"
                            className="mt-4 rounded-xl"
                            onClick={handleManageSubscription}
                        >
                            Open Payment Portal
                        </Button>
                    </div>
                </div>
            )}

            {/* Subscription History */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-4 sm:p-6 shadow-soft">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                    <span className="material-symbols-outlined text-orange-500 text-[22px]">receipt_long</span>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Subscription Details</h2>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-800 text-sm sm:text-base">
                        <span className="text-gray-500">Plan</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                            {subscription?.plan?.display_name || 'Basic (Free)'}
                        </span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-800 text-sm sm:text-base">
                        <span className="text-gray-500">Status</span>
                        <span className={`font-semibold ${subscription?.status === 'active' ? 'text-green-600' : 'text-gray-600'
                            }`}>
                            {subscription?.status || 'Active'}
                        </span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-800 text-sm sm:text-base">
                        <span className="text-gray-500">Billing Interval</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                            {subscription?.billing_interval
                                ? subscription.billing_interval.charAt(0).toUpperCase() + subscription.billing_interval.slice(1)
                                : 'N/A'
                            }
                        </span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-800 text-sm sm:text-base">
                        <span className="text-gray-500">Member Since</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                            {formatDate(subscription?.created_at)}
                        </span>
                    </div>
                    {subscription?.current_period_start && (
                        <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-800 text-sm sm:text-base">
                            <span className="text-gray-500">Current Period</span>
                            <span className="font-semibold text-gray-900 dark:text-white text-right">
                                {formatDate(subscription.current_period_start)} - {formatDate(subscription.current_period_end)}
                            </span>
                        </div>
                    )}
                </div>

                {/* Invoice History Note */}
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
                    <p className="text-sm text-gray-500">
                        Detailed transaction history and invoices are available through the payment portal.
                    </p>
                    {isPaid && (
                        <Button
                            variant="outline"
                            className="mt-3 rounded-xl w-full sm:w-auto"
                            onClick={handleManageSubscription}
                        >
                            View Invoices
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
