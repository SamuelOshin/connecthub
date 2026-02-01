import { DiscoveryCard, Profile } from "@/components/features/discover/DiscoveryCard";
import { DiscoverySettings } from "@/components/features/discover/DiscoverySettings";

const MOCK_PROFILE: Profile = {
  id: "1",
  name: "Jessica",
  age: 26,
  job: "UX Designer",
  company: "TechCorp",
  bio: "UX Designer by day, hiker by weekend. Looking for someone to share the best coffee spots in the city and maybe a dog walk or two. ☕️🐕",
  tags: ["Coffee", "Design", "Hiking", "Photography"],
  images: [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  ]
};

export default function DiscoverPage() {
  return (
    <div className="flex h-full">
      <main className="flex-1 relative flex flex-col items-center justify-center p-4 md:p-8 overflow-y-auto">
        {/* Background Blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

        <DiscoveryCard profile={MOCK_PROFILE} />

        <div className="mt-6 flex gap-8 text-xs font-medium text-slate-400 dark:text-slate-500">
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 font-sans shadow-sm">←</kbd> Pass
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 font-sans shadow-sm">↑</kbd> Open Profile
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 font-sans shadow-sm">→</kbd> Like
          </span>
        </div>
      </main>

      <DiscoverySettings />
    </div>
  );
}
