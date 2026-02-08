'use client';

import { MatchList } from '@/components/features/matches/MatchList';
import { MatchFilters } from '@/components/features/matches/MatchFilters';
import { useMatches } from '@/hooks/useMatches';

export default function MatchesPage() {
  const { matches, isLoading } = useMatches();

  return (
    <div className="flex h-full min-h-0">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-[#f5f7f8] dark:bg-[#0f1923] p-8">
        <MatchList matches={matches} isLoading={isLoading} />
      </div>

      {/* Right Sidebar - Filters */}
      <MatchFilters />
    </div>
  );
}
