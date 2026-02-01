"use client";

import {
  User,
  Lock,
  Shield,
  Bell,
  CreditCard,
  CheckCircle2,
  EyeOff,
  Ban,
  ChevronRight,
  Info,
  Trash
} from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="overflow-y-auto h-full">
      <div className="flex justify-center py-8 px-4 md:px-8">
      <div className="flex w-full max-w-[1024px] gap-8 flex-col lg:flex-row">
        {/* Settings Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-24 flex flex-col gap-6 rounded-2xl bg-white p-5 shadow-sm border border-slate-200 dark:bg-[#1a2733] dark:border-slate-800">
            <div className="flex gap-3 items-center pb-4 border-b border-slate-200 dark:border-slate-700">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 bg-slate-200"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDa8pL_9bw8XWG3GyNLv7nE4cZV7ZwsdABMi7QuP3lShY2xdsfAZzExWZ7YT1ifLq35DkP8GOPOM1fkpEh0xh7EByb9Es1spN3l0wP11n7ChQlR90tXVCZMMd9sF-Rj6g1KP2ny6Porb7uTNDKciboV1Y2jNq7dqNqVG3cooeAvvTZiANw-F5gFlk-RcSeuoEYAttmiIeTg1TUFPCMsqMy2c5BVP07bbv8XnewiLx3xfFyF78ceYmRO6Kra0zthKerZ87il4TktxyK3")' }}
              ></div>
              <div className="flex flex-col overflow-hidden">
                <h1 className="text-[#101418] dark:text-white text-sm font-bold leading-normal truncate">Alex Morgan</h1>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-normal leading-normal truncate">alex.m@example.com</p>
              </div>
            </div>
            <nav className="flex flex-col gap-1">
              <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                <User className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-[#101418] dark:group-hover:text-white" />
                <p className="text-[#101418] dark:text-white text-sm font-medium leading-normal">Account</p>
              </Link>
              <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                <Lock className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-[#101418] dark:group-hover:text-white" />
                <p className="text-[#101418] dark:text-white text-sm font-medium leading-normal">Privacy</p>
              </Link>
              <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-xl bg-primary/10 text-primary transition-colors">
                <Shield className="w-5 h-5 fill-current" />
                <p className="text-primary text-sm font-bold leading-normal">Safety Center</p>
              </Link>
              <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                <Bell className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-[#101418] dark:group-hover:text-white" />
                <p className="text-[#101418] dark:text-white text-sm font-medium leading-normal">Notifications</p>
              </Link>
              <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                <CreditCard className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-[#101418] dark:group-hover:text-white" />
                <p className="text-[#101418] dark:text-white text-sm font-medium leading-normal">Billing</p>
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Settings Content */}
        <main className="flex-1 flex flex-col gap-6 min-w-0">
          <div className="flex flex-col gap-2">
            <h1 className="text-[#101418] dark:text-white text-[32px] font-bold leading-tight">Settings & Safety</h1>
            <p className="text-slate-500 dark:text-slate-400 text-base">Manage your account security, privacy preferences, and verification status.</p>
          </div>

          {/* Get Verified Banner */}
          <div className="@container">
            <div className="flex flex-col items-stretch justify-start rounded-2xl @xl:flex-row @xl:items-center shadow-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a2733] overflow-hidden">
              <div
                className="w-full @xl:w-1/3 bg-center bg-no-repeat bg-cover h-48 @xl:h-full min-h-[180px]"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDHxJmOrOdkV_HYyAKpEcNahYH_gAcU_GbXFYR526EGdE-KcQuDd3H3stcI0smHn9y0rz7OTnYprJQy3iCG2cgqdbXtBLDySl6y07bxPw1MjukHJPdtm_u5MevSzo6rftaBpV91FTfSuJWRA9eKzC3fo_8chHNsYBynIND1NvfDFsN_8mkV-nBjxPeaFZVXYbUz5ajJYf_Gw9LKuX7TaalvSUm2StfKU6Lw4wBJISUs9SaqO4-CX05P0O51sYmiR28vZd5uAmoxXBD7")' }}
              >
                <div className="w-full h-full bg-primary/20 backdrop-blur-[2px]"></div>
              </div>
              <div className="flex w-full grow flex-col items-start justify-center gap-3 p-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-primary w-8 h-8" />
                  <h3 className="text-[#101418] dark:text-white text-xl font-bold leading-tight">Get Verified</h3>
                </div>
                <p className="text-slate-500 dark:text-slate-300 text-base font-normal leading-normal">
                  Verify your profile to get the Blue Badge and show others you&apos;re real. It increases your match rate by 30% and builds trust.
                </p>
                <button className="mt-2 flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-primary hover:bg-blue-600 text-white text-sm font-bold leading-normal transition-colors shadow-lg shadow-primary/30">
                  <span>Verify Identity Now</span>
                </button>
              </div>
            </div>
          </div>

          {/* Privacy Controls */}
          <div className="bg-white dark:bg-[#1a2733] rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 pb-4 mb-2 border-b border-slate-200 dark:border-slate-800">
              <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-full text-purple-600 dark:text-purple-400">
                <EyeOff className="w-6 h-6" />
              </div>
              <h2 className="text-[#101418] dark:text-white text-xl font-bold">Privacy Controls</h2>
            </div>
            <div className="flex flex-col divide-y divide-slate-200 dark:divide-slate-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between py-5 gap-4">
                <div className="flex flex-col gap-1 max-w-2xl">
                  <h3 className="text-base font-bold text-[#101418] dark:text-white">Incognito Mode</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Only people you have already liked can see your profile. You won&apos;t appear in the main discovery feed.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between py-5 gap-4">
                <div className="flex flex-col gap-1 max-w-2xl">
                  <h3 className="text-base font-bold text-[#101418] dark:text-white">Active Status</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Allow matches to see when you were last active on ConnectHub.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between py-5 gap-4">
                <div className="flex flex-col gap-1 max-w-2xl">
                  <h3 className="text-base font-bold text-[#101418] dark:text-white">Read Receipts</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Let matches know when you&apos;ve read their messages.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Safety & Blocking */}
          <div className="bg-white dark:bg-[#1a2733] rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 pb-4 mb-2 border-b border-slate-200 dark:border-slate-800">
              <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-full text-red-600 dark:text-red-400">
                <Ban className="w-6 h-6" />
              </div>
              <h2 className="text-[#101418] dark:text-white text-xl font-bold">Safety & Blocking</h2>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between py-3">
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-bold text-[#101418] dark:text-white">Blocked Contacts</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Manage the list of people you have blocked.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-600 text-[#101418] dark:text-white font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <span>Manage List</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="rounded-xl bg-primary/5 border border-primary/10 p-4 flex gap-4 items-start">
                <Info className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h4 className="text-sm font-bold text-[#101418] dark:text-white mb-1">Safety Tip</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    Never share your financial information, social security number, or home address with someone you&apos;ve just met online.
                    <Link href="#" className="text-primary font-medium hover:underline ml-1">Read our full Safety Guide</Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white dark:bg-[#1a2733] rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 pb-4 mb-2 border-b border-slate-200 dark:border-slate-800">
              <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-full text-orange-600 dark:text-orange-400">
                <Bell className="w-6 h-6" />
              </div>
              <h2 className="text-[#101418] dark:text-white text-xl font-bold">Notification Preferences</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-2">
              <div className="flex items-center justify-between p-2">
                <span className="text-base font-medium text-[#101418] dark:text-white">New Matches</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-2">
                <span className="text-base font-medium text-[#101418] dark:text-white">New Messages</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-2">
                <span className="text-base font-medium text-[#101418] dark:text-white">Super Likes</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-2">
                <span className="text-base font-medium text-[#101418] dark:text-white">Promotions & Tips</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 pb-10">
            <div className="flex justify-end gap-4">
              <button className="px-6 py-3 rounded-full font-bold text-sm text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                Cancel
              </button>
              <button className="px-8 py-3 rounded-full bg-primary hover:bg-blue-600 text-white font-bold text-sm shadow-lg shadow-primary/25 transition-all transform active:scale-95">
                Save Changes
              </button>
            </div>
            <div className="mt-8">
              <button className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-medium transition-colors">
                <Trash className="w-5 h-5" />
                Delete Account
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
    </div>
  );
}
