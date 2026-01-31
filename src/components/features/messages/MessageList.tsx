"use client";

import { Search, MoreVertical } from "lucide-react";
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

const MOCK_NEW_MATCHES = [
  { id: "1", name: "Jessica", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80" },
  { id: "2", name: "Amanda", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80" },
  { id: "3", name: "Chloe", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=764&q=80" },
  { id: "4", name: "Sam", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80", isOffline: true },
];

export function MessageList({ chats }: { chats: ChatPreview[] }) {
  return (
    <aside className="w-full md:w-[340px] flex flex-col bg-white dark:bg-[#1a242f] border-r border-slate-200 dark:border-slate-800 h-full z-10 shrink-0">
      <div className="p-4 pb-2">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-slate-400" />
          </div>
          <input 
            className="block w-full p-3 pl-10 text-sm text-slate-900 border-none rounded-full bg-slate-100 dark:bg-slate-800 dark:text-white placeholder-slate-500 focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-slate-800 transition-all outline-none" 
            placeholder="Search matches..." 
            type="text" 
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* New Matches Section */}
        <div className="pt-4 px-4">
          <div className="flex justify-between items-center mb-3 px-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">New Matches</h3>
            <span className="bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300 text-xs font-bold px-2 py-0.5 rounded-full">3 New</span>
          </div>
          
          <div className="flex overflow-x-auto gap-4 pb-4 px-2 hide-scrollbar">
            {MOCK_NEW_MATCHES.map((match) => (
              <div key={match.id} className={cn("flex flex-col items-center gap-1 min-w-[72px] cursor-pointer group", match.isOffline && "opacity-80 hover:opacity-100")}>
                <div className="relative">
                  <div className={cn("w-[72px] h-[72px] rounded-full p-[2px]", !match.isOffline ? "bg-gradient-to-tr from-pink-500 to-primary" : "border border-slate-200 dark:border-slate-700")}>
                    <div 
                      className={cn("w-full h-full rounded-full border-2 border-white dark:border-[#1a242f] bg-cover bg-center", match.isOffline && "grayscale-[30%]")} 
                      style={{ backgroundImage: `url('${match.avatar}')` }}
                    />
                  </div>
                  {!match.isOffline && (
                    <div className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 border-2 border-white dark:border-[#1a242f] rounded-full"></div>
                  )}
                </div>
                <span className={cn("text-xs font-semibold transition-colors", match.isOffline ? "text-slate-500" : "group-hover:text-primary")}>
                  {match.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800 my-2"></div>

        {/* Messages Section */}
        <div className="px-2 pb-4">
          <h3 className="px-4 py-2 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Messages</h3>
          
          <div className="flex flex-col gap-1">
            {chats.map((chat) => (
              <div 
                key={chat.id} 
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors",
                  chat.isActive 
                    ? "bg-primary/5 border-l-4 border-primary" 
                    : "hover:bg-slate-50 dark:hover:bg-slate-800/50 border-l-4 border-transparent"
                )}
              >
                <div className="relative shrink-0">
                  <div 
                    className="h-12 w-12 rounded-full bg-cover bg-center" 
                    style={{ backgroundImage: `url('${chat.avatar}')` }}
                  />
                  {chat.isActive && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white dark:border-[#1a242f] rounded-full"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className={cn("text-sm", chat.isActive ? "font-bold text-slate-900 dark:text-white" : "font-semibold text-slate-900 dark:text-white")}>
                      {chat.name}
                    </h4>
                    <span className={cn("text-xs", chat.isActive ? "text-primary font-medium" : "text-slate-400")}>
                      {chat.time}
                    </span>
                  </div>
                  <p className={cn("text-sm truncate", chat.isActive ? "text-slate-600 dark:text-slate-400" : "text-slate-500 dark:text-slate-500")}>
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
