"use client";

import { Phone, Video, Info, PlusCircle, Image as ImageIcon, Smile, Send, CheckCheck, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface Message {
  id: string;
  text?: string;
  sender: "me" | "them";
  timestamp: string;
  isRead?: boolean;
  type?: "text" | "system";
}

export function ChatArea() {
  const MESSAGES: Message[] = [
    { 
      id: "0", 
      type: "system", 
      text: "Sarah made the first move. Be a gentleman and reply!",
      timestamp: "Today, 10:23 AM", 
      sender: "them" 
    },
    { 
      id: "1", 
      text: "Hey! 👋 I noticed you have a picture at Yosemite. I was just there last summer!", 
      sender: "them", 
      timestamp: "10:23 AM" 
    },
    { 
      id: "2", 
      text: "The Half Dome hike was intense but totally worth it. Did you make it to the top?", 
      sender: "them", 
      timestamp: "10:24 AM" 
    },
    { 
      id: "3", 
      text: "Hi Sarah! Yes, Yosemite is incredible. 🏔️", 
      sender: "me", 
      timestamp: "10:30 AM" 
    },
    { 
      id: "4", 
      text: "I actually did Half Dome a couple of years ago. My legs were dead for a week after! 😂", 
      sender: "me", 
      timestamp: "10:30 AM",
      isRead: true
    },
  ];

  const USER = {
    name: "Sarah",
    age: 24,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    status: "Online now"
  };

  return (
    <main className="hidden md:flex flex-1 flex-col bg-[#f8f9fa] dark:bg-[#0f1923] relative min-w-0 h-full">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a242f] shadow-sm z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative cursor-pointer">
            <div 
              className="h-10 w-10 rounded-full bg-cover bg-center" 
              style={{ backgroundImage: `url('${USER.avatar}')` }}
            />
            <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 border-2 border-white dark:border-[#1a242f] rounded-full"></div>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              {USER.name}, {USER.age}
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-[10px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wide">Match</span>
            </h3>
            <p className="text-xs text-green-600 dark:text-green-400 font-medium">{USER.status}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-10 w-10 rounded-full bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-primary flex items-center justify-center transition-colors" title="Voice Call">
            <Phone className="w-5 h-5" />
          </button>
          <button className="h-10 w-10 rounded-full bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-primary flex items-center justify-center transition-colors" title="Video Call">
            <Video className="w-5 h-5" />
          </button>
          <div className="h-6 w-px bg-slate-300 dark:bg-slate-700 mx-1"></div>
          <button className="h-10 w-10 rounded-full bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 flex items-center justify-center transition-colors" title="Profile Info">
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white/50 dark:bg-[#0f1923]">
        <div className="flex justify-center">
          <span className="text-xs font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">Today, 10:23 AM</span>
        </div>

        {MESSAGES.map((msg) => {
          if (msg.type === "system") {
            return (
              <div key={msg.id} className="flex flex-col items-center justify-center animate-fade-in-up">
                <div className="bg-pink-50 dark:bg-pink-900/10 border border-pink-100 dark:border-pink-900/30 text-pink-600 dark:text-pink-300 px-6 py-3 rounded-2xl text-center max-w-md shadow-sm">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Heart className="w-4 h-4 fill-current text-pink-500" />
                    <span className="font-bold text-sm">It’s a Match!</span>
                  </div>
                  <p className="text-xs opacity-90">{msg.text}</p>
                </div>
              </div>
            );
          }

          const isMe = msg.sender === "me";

          return (
            <div key={msg.id} className={cn("flex items-end gap-3 max-w-[80%]", isMe ? "ml-auto justify-end" : "")}>
              {!isMe && (
                <div 
                  className="h-8 w-8 rounded-full bg-cover bg-center mb-1 shrink-0" 
                  style={{ backgroundImage: `url('${USER.avatar}')` }}
                />
              )}
              
              <div className={cn("flex flex-col gap-1", isMe ? "items-end" : "items-start")}>
                <div 
                  className={cn(
                    "p-4 rounded-2xl shadow-sm text-sm leading-relaxed",
                    isMe 
                      ? "bg-primary text-white rounded-br-none" 
                      : "bg-[#f0f2f5] dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none"
                  )}
                >
                  {msg.text}
                </div>
                <span className={cn("text-[10px] text-slate-400 flex items-center gap-1", isMe ? "pr-1" : "pl-1")}>
                  {msg.timestamp}
                  {isMe && msg.isRead && <CheckCheck className="w-3.5 h-3.5" />}
                </span>
              </div>
            </div>
          );
        })}
        
        {/* Suggested Actions */}
        <div className="flex flex-wrap justify-center gap-2 mt-4 py-2">
            <Button variant="outline" className="bg-white dark:bg-slate-800 border-primary/20 hover:border-primary text-primary dark:text-blue-400 rounded-full text-xs h-auto py-2 shadow-sm hover:shadow transform hover:-translate-y-0.5">
                Ask about her favorite trail 🌲
            </Button>
            <Button variant="outline" className="bg-white dark:bg-slate-800 border-pink-200 hover:border-pink-400 text-pink-500 dark:text-pink-400 rounded-full text-xs h-auto py-2 shadow-sm hover:shadow transform hover:-translate-y-0.5">
                Suggest a hiking date 🥾
            </Button>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-[#1a242f] border-t border-slate-200 dark:border-slate-800 shrink-0">
        <div className="flex items-end gap-2 max-w-4xl mx-auto">
          <button className="mb-1 p-2 text-slate-400 hover:text-primary transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
            <PlusCircle className="w-6 h-6" />
          </button>
          <button className="mb-1 p-2 text-slate-400 hover:text-pink-500 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
            <ImageIcon className="w-6 h-6" />
          </button>
          <div className="flex-1 bg-[#f0f2f5] dark:bg-slate-800 rounded-3xl flex items-center px-4 py-3 border border-transparent focus-within:border-primary/50 focus-within:bg-white dark:focus-within:bg-slate-900 transition-all">
            <textarea 
              className="w-full bg-transparent border-none focus:ring-0 p-0 text-sm text-slate-900 dark:text-white placeholder-slate-500 resize-none max-h-32 outline-none" 
              placeholder="Type a message..." 
              rows={1}
            />
            <button className="ml-2 text-slate-400 hover:text-yellow-500 transition-colors">
              <Smile className="w-6 h-6" />
            </button>
          </div>
          <button className="mb-1 p-3 bg-primary hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group">
            <Send className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
        <div className="text-center mt-2">
          <p className="text-[10px] text-slate-400">Press Enter to send</p>
        </div>
      </div>
    </main>
  );
}
