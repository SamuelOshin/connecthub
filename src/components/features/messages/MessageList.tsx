"use client";

import { cn } from "@/lib/utils";

export interface ChatPreview {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: boolean;
  isActive?: boolean;
}

export function MessageList({
  chats,
  isLoading,
  selectedId,
  onSelect,
}: {
  chats: ChatPreview[];
  isLoading?: boolean;
  selectedId?: string | null;
  onSelect?: (id: string) => void;
}) {
  return (
    <aside className="w-full md:w-90 flex flex-col bg-surface-light dark:bg-surface-dark border-r border-[#e5e7eb] dark:border-gray-800 h-full z-10 shrink-0">
      {/* Search Box */}
      <div className="p-4 pb-3">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <span className="material-symbols-outlined text-gray-400 text-[20px]">search</span>
          </div>
          <input
            className="block w-full py-3 pl-12 pr-4 text-sm text-gray-900 border-none rounded-full bg-[#f0f2f5] dark:bg-gray-800 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-900 transition-all outline-none"
            placeholder="Search matches..."
            type="text"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Messages Section */}
        <div className="px-3 pb-4">
          <h3 className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Messages
          </h3>

          <div className="flex flex-col gap-0.5">
            {isLoading && (
              <div className="px-3 py-6 text-xs text-gray-400">Loading conversations...</div>
            )}
            {!isLoading && chats.length === 0 && (
              <div className="px-3 py-6 text-xs text-gray-400">No conversations yet.</div>
            )}
            {chats.map((chat) => (
              <div
                key={chat.id}
              <div
                key={chat.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-colors relative",
                  selectedId === chat.id
                    ? "bg-primary/5 dark:bg-primary/10"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                )}
                onClick={() => onSelect?.(chat.id)}
              >
                {/* Active indicator */}
                {selectedId === chat.id && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-primary rounded-r-full"></span>
                )}

                <div className="relative shrink-0">
                  <div
                    className="size-12 rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${chat.avatar}')` }}
                  />
                  {selectedId === chat.id && (
                    <div className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-white dark:border-surface-dark rounded-full"></div>
                  )}
                </div>


                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className={cn(
                      "text-sm text-gray-900 dark:text-white",
                      selectedId === chat.id ? "font-bold" : "font-semibold"
                    )}>
                      {chat.name}
                    </h4>
                    <span className={cn(
                      "text-[11px] shrink-0",
                      selectedId === chat.id ? "text-primary font-medium" : "text-gray-400"
                    )}>
                      {chat.time}
                    </span>
                  </div>
                  <p className={cn(
                    "text-sm truncate",
                    chat.isActive ? "text-gray-600 dark:text-gray-400" : "text-gray-500 dark:text-gray-500"
                  )}>
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
