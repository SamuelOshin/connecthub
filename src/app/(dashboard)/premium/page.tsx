"use client";

import { useState } from "react";
import { CheckCircle2, X, Lock, CreditCard, HelpCircle, ArrowRight } from "lucide-react";

export default function PremiumPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-10">
      {/* Hero Section */}
      <div className="mb-12 flex flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#101418] dark:text-white md:text-5xl">
          Upgrade Your Dating Life
        </h1>
        <p className="max-w-2xl text-lg text-slate-500 dark:text-slate-400">
          Unlock exclusive features to find your perfect match faster. Choose the plan that fits your journey.
        </p>

        {/* Billing Toggle */}
        <div className="mt-6 flex w-fit rounded-full bg-slate-200 p-1 dark:bg-slate-800">
          <label className="cursor-pointer">
            <input
              type="radio"
              name="billing"
              value="monthly"
              className="peer sr-only"
              checked={billingCycle === "monthly"}
              onChange={() => setBillingCycle("monthly")}
            />
            <div className="rounded-full px-6 py-2 text-sm font-semibold text-slate-500 transition-all peer-checked:bg-white peer-checked:text-[#101418] peer-checked:shadow-sm dark:peer-checked:bg-primary dark:peer-checked:text-white">
              Monthly
            </div>
          </label>
          <label className="cursor-pointer">
            <input
              type="radio"
              name="billing"
              value="yearly"
              className="peer sr-only"
              checked={billingCycle === "yearly"}
              onChange={() => setBillingCycle("yearly")}
            />
            <div className="flex items-center gap-2 rounded-full px-6 py-2 text-sm font-semibold text-slate-500 transition-all peer-checked:bg-white peer-checked:text-[#101418] peer-checked:shadow-sm dark:peer-checked:bg-primary dark:peer-checked:text-white">
              Yearly <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] text-green-700 dark:bg-green-900 dark:text-green-300">Save 20%</span>
            </div>
          </label>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="mb-16 grid grid-cols-1 items-start gap-6 md:grid-cols-3 lg:gap-8">
        {/* Basic Plan */}
        <div className="group relative flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-[#1a2733]">
          <div className="mb-5">
            <h3 className="mb-2 text-lg font-bold text-[#101418] dark:text-white">Basic</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black tracking-tight text-[#101418] dark:text-white">Free</span>
              <span className="text-slate-500 font-medium dark:text-slate-400">forever</span>
            </div>
          </div>
          <button className="mb-6 w-full cursor-default rounded-full bg-slate-100 py-3 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
            Current Plan
          </button>
          <div className="flex-1 space-y-4">
            <div className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Standard matching</span>
            </div>
            <div className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Limited swipes (50/day)</span>
            </div>
            <div className="flex gap-3 text-sm text-slate-400 decoration-slate-400/50 line-through dark:text-slate-600">
              <X className="w-5 h-5 text-slate-300 dark:text-slate-600" />
              <span>See who likes you</span>
            </div>
          </div>
        </div>

        {/* Premium Plan */}
        <div className="group relative z-10 flex transform flex-col rounded-xl border-2 border-primary bg-white p-6 shadow-xl shadow-primary/10 dark:bg-[#1a2733] md:-translate-y-4">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold tracking-wide text-white uppercase shadow-sm">
            Most Popular
          </div>
          <div className="mb-5">
            <h3 className="mb-2 text-lg font-bold text-primary">Premium</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black tracking-tight text-[#101418] dark:text-white">$19.99</span>
              <span className="text-slate-500 font-medium dark:text-slate-400">/mo</span>
            </div>
          </div>
          <button className="mb-6 w-full rounded-full bg-primary py-3 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-blue-600 hover:shadow-primary/40">
            Select Premium
          </button>
          <div className="flex-1 space-y-4">
            <div className="flex gap-3 text-sm font-medium text-slate-700 dark:text-slate-200">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Unlimited Swipes</span>
            </div>
            <div className="flex gap-3 text-sm font-medium text-slate-700 dark:text-slate-200">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>See Who Likes You</span>
            </div>
            <div className="flex gap-3 text-sm font-medium text-slate-700 dark:text-slate-200">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>5 Super Likes per week</span>
            </div>
            <div className="flex gap-3 text-sm font-medium text-slate-700 dark:text-slate-200">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Advanced Filters</span>
            </div>
          </div>
        </div>

        {/* Elite Plan */}
        <div className="group relative flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-[#1a2733]">
          <div className="mb-5">
            <h3 className="mb-2 text-lg font-bold text-[#101418] dark:text-white">Elite</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black tracking-tight text-[#101418] dark:text-white">$39.99</span>
              <span className="text-slate-500 font-medium dark:text-slate-400">/mo</span>
            </div>
          </div>
          <button className="mb-6 w-full rounded-full border border-slate-200 bg-slate-50 py-3 text-sm font-bold text-[#101418] transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700">
            Select Elite
          </button>
          <div className="flex-1 space-y-4">
            <div className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Everything in Premium</span>
            </div>
            <div className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Priority Placement</span>
            </div>
            <div className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>1 Monthly Profile Boost</span>
            </div>
            <div className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Read Receipts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Form */}
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center gap-2 border-b border-slate-200 px-4 pb-6 dark:border-slate-800">
          <Lock className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-[#101418] dark:text-white">Secure Checkout</h2>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#1a2733] md:p-8">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Card Number</label>
              <div className="relative">
                <input
                  type="text"
                  className="block w-full rounded-lg border-slate-300 bg-white py-3 pl-12 text-[#101418] shadow-sm focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  placeholder="0000 0000 0000 0000"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <CreditCard className="text-slate-400 w-5 h-5" />
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-3">
                  <div className="h-5 w-8 rounded-sm bg-gradient-to-br from-orange-400 to-red-500 opacity-50"></div>
                  <div className="h-5 w-8 rounded-sm bg-blue-600 opacity-50"></div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Expiration</label>
                <input
                  type="text"
                  className="block w-full rounded-lg border-slate-300 bg-white px-4 py-3 text-[#101418] shadow-sm focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  placeholder="MM / YY"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">CVC</label>
                <div className="relative">
                  <input
                    type="text"
                    className="block w-full rounded-lg border-slate-300 bg-white px-4 py-3 text-[#101418] shadow-sm focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    placeholder="123"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <HelpCircle className="text-sm text-slate-400 w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Zip Code</label>
              <input
                type="text"
                className="block w-full rounded-lg border-slate-300 bg-white px-4 py-3 text-[#101418] shadow-sm focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                placeholder="12345"
              />
            </div>
            <button
              type="submit"
              className="group mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 text-lg font-bold text-white shadow-lg shadow-primary/25 transition-colors hover:bg-blue-600"
            >
              <span>Upgrade Now</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
              By clicking &quot;Upgrade Now&quot;, you agree to our <a href="#" className="underline hover:text-primary">Terms</a> and <a href="#" className="underline hover:text-primary">Privacy Policy</a>. Your subscription will renew automatically.
            </p>
          </form>
        </div>
        <div className="mt-8 flex justify-center gap-6 opacity-70 grayscale dark:text-slate-600">
          <div className="h-6 w-12 rounded bg-current"></div>
          <div className="h-6 w-12 rounded bg-current"></div>
          <div className="h-6 w-12 rounded bg-current"></div>
        </div>
      </div>

      <div className="mt-16 border-t border-slate-200 py-6 text-center dark:border-slate-800">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © 2023 ConnectHub. All rights reserved.
        </p>
      </div>
    </div>
  );
}
