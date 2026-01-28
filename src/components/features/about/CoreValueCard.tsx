import { LucideIcon } from "lucide-react";

interface CoreValueCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function CoreValueCard({ icon: Icon, title, description }: CoreValueCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[#dce0e5] dark:border-slate-800 bg-white dark:bg-slate-900 p-8 hover:border-primary transition-colors group">
      <div className="text-primary bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-[#111418] dark:text-white text-xl font-bold leading-tight">{title}</h3>
        <p className="text-[#637588] dark:text-slate-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
