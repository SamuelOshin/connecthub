'use client';

import { SwipeStack } from '@/components/features/discovery/SwipeStack';
import { DiscoverySettings } from '@/components/features/discover/DiscoverySettings';

export default function DiscoverPage() {
  return (
    <div className="flex h-full min-h-0">
      {/* Main Content - Centered Swipe Area */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-[#f5f7f8] dark:bg-[#0f1923]">
        {/* Centered Swipe Card */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-sm w-full">
            <SwipeStack />
          </div>
        </div>

        {/* Keyboard Shortcuts Hint */}
        <div className="pb-6 flex items-center justify-center">
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs font-mono">←</kbd>
              Pass
            </span>
            <span className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs font-mono">↑</kbd>
              Open Profile
            </span>
            <span className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs font-mono">→</kbd>
              Like
            </span>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Discovery Settings */}
      <DiscoverySettings />
    </div>
  );
}
