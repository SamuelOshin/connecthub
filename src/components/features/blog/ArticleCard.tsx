import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ArticleCardProps {
  image: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
}

export function ArticleCard({ image, category, title, excerpt, readTime }: ArticleCardProps) {
  return (
    <div className="group flex flex-col gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-800">
      <div
        className="w-full bg-center bg-no-repeat aspect-[16/10] bg-cover rounded-lg overflow-hidden"
        style={{ backgroundImage: `url("${image}")` }}
      />
      <div className="flex flex-col gap-2">
        <span className="text-primary text-xs font-bold uppercase tracking-widest">{category}</span>
        <h3 className="text-[#111418] dark:text-white text-lg font-bold leading-snug group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm font-normal line-clamp-2">
          {excerpt}
        </p>
        <div className="flex items-center justify-between mt-2 pt-4 border-t border-slate-50 dark:border-slate-800">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-tighter">{readTime} min read</p>
          <Link href="#" className="flex items-center gap-1 text-primary text-sm font-bold">
            Read Article <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
