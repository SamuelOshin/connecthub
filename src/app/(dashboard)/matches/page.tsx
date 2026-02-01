import { MatchFilters } from "@/components/features/matches/MatchFilters";
import { MatchGrid, MatchProfile } from "@/components/features/matches/MatchGrid";
import { NewMatch, NewMatchesCarousel } from "@/components/features/matches/NewMatchesCarousel";

const MOCK_NEW_MATCHES: NewMatch[] = [
  { id: "1", name: "Jessica", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80" },
  { id: "2", name: "Sarah", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80" },
  { id: "3", name: "Maya", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=764&q=80" },
  { id: "4", name: "Emily", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80" },
];

const MOCK_PROFILES: MatchProfile[] = [
  {
    id: "1",
    name: "Jessica",
    age: 26,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    status: "Online",
    activeStatus: "Active now"
  },
  {
    id: "2",
    name: "Sarah",
    age: 24,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    status: "New Match",
    activeStatus: "2 miles away",
    distance: "2 miles away"
  },
  {
    id: "3",
    name: "Maya",
    age: 27,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=764&q=80",
    status: "Offline",
    activeStatus: "Active 2h ago"
  },
  {
    id: "4",
    name: "Emily",
    age: 25,
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    status: "Super Like",
    activeStatus: "Active 10m ago"
  },
    {
    id: "5",
    name: "Chloe",
    age: 23,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    status: "Offline",
    activeStatus: "Active 1d ago"
  },
];

export default function MatchesPage() {
  return (
    <div className="flex h-full">
      <main className="flex-1 relative flex flex-col h-full overflow-hidden bg-[#f5f7f8] dark:bg-[#0f1923]">
        <div className="flex-1 overflow-y-auto">
          <NewMatchesCarousel matches={MOCK_NEW_MATCHES} />
          <MatchGrid profiles={MOCK_PROFILES} />
        </div>
      </main>

      <MatchFilters />
    </div>
  );
}
