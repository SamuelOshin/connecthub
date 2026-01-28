import { LucideIcon } from "lucide-react";

interface HelpCategoryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function HelpCategoryCard({ icon: Icon, title, description }: HelpCategoryCardProps) {
  return (
    <div className="group flex flex-1 gap-4 rounded-xl border border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-[#1a2632] p-6 flex-col hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer">
      <div className="flex items-center justify-center size-12 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-[#111418] dark:text-white text-lg font-bold leading-tight">{title}</h3>
        <p className="text-[#5f758c] dark:text-gray-400 text-sm font-normal leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
