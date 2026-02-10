'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PremiumPlansPage() {
    const PLANS = [
        {
            id: 'gold',
            name: 'Gold',
            icon: 'star',
            monthlyPrice: 14.99,
            features: [
                'Unlimited likes',
                'See who likes you',
                '5 Super Likes per day',
                'Rewind last swipe',
                'Passport to any location',
            ],
            popular: false,
            gradient: 'from-yellow-400 to-amber-500'
        },
        {
            id: 'platinum',
            name: 'Platinum',
            icon: 'diamond',
            monthlyPrice: 24.99,
            features: [
                'Everything in Gold',
                'Message before matching',
                'Priority likes',
                'See who viewed you',
                'Read receipts',
                'Weekly boost',
            ],
            popular: true,
            gradient: 'from-pink-500 to-rose-500'
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 dark:from-gray-900 dark:via-background-dark dark:to-gray-900">
            <div className="max-w-4xl mx-auto p-4 sm:p-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <Link
                        href="/settings"
                        className="p-2 -ml-2 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-800"
                    >
                        <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Premium Plans
                    </h1>
                </div>

                {/* Hero */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center size-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl mb-4 shadow-lg shadow-pink-500/30">
                        <span className="material-symbols-outlined text-white text-[32px] icon-filled">diamond</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Find Your Perfect Match Faster
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Unlock premium features and boost your dating experience
                    </p>
                </div>

                {/* Plans */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
                    {PLANS.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative bg-surface-light dark:bg-surface-dark rounded-2xl p-5 sm:p-6 shadow-soft border-2 transition-all ${plan.popular
                                ? 'border-pink-500 shadow-lg shadow-pink-500/10'
                                : 'border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                                    Most Popular
                                </div>
                            )}

                            <div className="flex items-center gap-3 mb-4">
                                <div className={`size-12 rounded-xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center`}>
                                    <span className="material-symbols-outlined text-white text-[24px] icon-filled">{plan.icon}</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                                        ConnectHub {plan.name}
                                    </h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                            ${plan.monthlyPrice}
                                        </span>
                                        <span className="text-sm text-gray-500">/month</span>
                                    </div>
                                </div>
                            </div>

                            <ul className="space-y-2.5 mb-5">
                                {plan.features.map((feature) => (
                                    <li
                                        key={feature}
                                        className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                                    >
                                        <span className={`material-symbols-outlined text-[18px] ${plan.popular ? 'text-pink-500' : 'text-yellow-500'} icon-filled`}>
                                            check_circle
                                        </span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Button
                                className={`w-full h-12 font-bold rounded-xl ${plan.popular
                                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg shadow-pink-500/30'
                                    : 'bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white shadow-lg shadow-amber-500/30'
                                    }`}
                            >
                                Get {plan.name}
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Comparison */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-5 sm:p-6 shadow-soft mb-6 overflow-x-auto">
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">compare</span>
                        Compare Plans
                    </h3>
                    <table className="w-full text-xs">
                        <thead>
                            <tr className="text-gray-500">
                                <th className="text-left py-2">Feature</th>
                                <th className="text-center py-2">Free</th>
                                <th className="text-center py-2 text-yellow-600">Gold</th>
                                <th className="text-center py-2 text-pink-500">Platinum</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 dark:text-gray-300">
                            {[
                                ['Daily Likes', '25', '∞', '∞'],
                                ['See Who Likes', '✕', '✓', '✓'],
                                ['Super Likes', '1/day', '5/day', '10/day'],
                                ['Message First', '✕', '✕', '✓'],
                                ['Priority Likes', '✕', '✕', '✓'],
                            ].map(([feature, free, gold, platinum]) => (
                                <tr key={feature} className="border-t border-gray-100 dark:border-gray-800">
                                    <td className="py-2.5">{feature}</td>
                                    <td className="text-center py-2.5">{free}</td>
                                    <td className="text-center py-2.5">{gold}</td>
                                    <td className="text-center py-2.5">{platinum}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Terms */}
                <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                    Subscription automatically renews. Cancel anytime.
                    <br />
                    <Link href="/settings/legal" className="text-primary hover:underline">Terms & Conditions</Link>
                </p>
            </div>
        </div>
    );
}
