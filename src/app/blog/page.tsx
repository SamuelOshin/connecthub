import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArticleCard } from "@/components/features/blog/ArticleCard";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const BLOG_CATEGORIES = [
  "All Stories",
  "Success Stories",
  "Dating Tips",
  "Safety News",
  "Relationship Advice"
];

const ARTICLES = [
  {
    category: "Safety News",
    title: "5 Ways to Spot a Romance Scam",
    excerpt: "Learn how to protect yourself and stay safe while dating online with these essential security tips.",
    readTime: "5",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjtdPMIepKmu5ca9vnTrOilDpFuOwxB2GB6mkf7h5m7e8ZuuBN82nry2hXz7qdYg8cjs7Z4-LhxZltXQ2UeNqS25qh8xgHq20ViUuNzvac6kM7Nwie30u0K-qI_mhMhI8Ho3O_KS0EMd98n7qLJmaNbTLJyZbZYAVqoLY40V3b---K_OuOmc1lI--0ajsbKyDqZRiBlmW54zz2aqSzKI1FybBol-iXN2MOM61fSca6b0VxbKq9RFzDfvIS6XGXAVsMI2fE-Y8BcJA9"
  },
  {
    category: "Dating Tips",
    title: "The Art of the First Message",
    excerpt: "Master the perfect opening line with these proven tips to break the ice and get a reply.",
    readTime: "4",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_SBjJybjUmknaYP4gnXfEnR4qIw5RZiKv5kbOMI_pRHs6NZSsi8wjK6UMy7SW0RhC-_qbDM6N9MWkdtVKsKNwYxDD5Mto9Yottw4x4JiWTlfnKJJJ7DSdHB3bDoXV1vXrJpbiHIjAUVria8mhlewpgnLA1B2ZEEEYgBH8C54ZhUKgpnJpLXaRw7vGsZB6gRz67wX3aApD39wlNBruk6TxwIwGmTbO9oS6alh93ZcsT9qQwRcCdFfyxjkHNiuUxmeDMWkezuxR8lqG"
  },
  {
    category: "Success Story",
    title: "Finding Your Type: Alex & Jo",
    excerpt: "A beautiful story about finding love through shared hobbies and discovering what truly matters.",
    readTime: "7",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1JD6H98ZBqpKbQUYcStoo_Sn_9-1HcmY-AGDwvHqpyvqKoMf-YvYr3jc-M1wRvTjrud5ZC9sYTxmSFioIE19TLZrPeObMFUje_faa3-us0HQWly2sv27lL6XOsMhTFXx5gwoqgEV7OwdEFrxludvwmy6GkZq5nnIuKrL8C6IkE2-_tf6IQ-ATRq95vfGX0OG14k3TtCU3oSPNfi1yyueSLzf2x1BzkVG08i8_V323XzenNznSUnuvrJldZ5C3PKeyh7Eb5zwNhWYp"
  },
  {
    category: "Safety",
    title: "Safety First: New Features",
    excerpt: "Check out our latest security updates and profile verification tools designed for your peace of mind.",
    readTime: "3",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBa1xwIcWx-cxxPCep7iCtfDjPwsc9pg75PACgul51NEV97CVH8FGmI9F8Z3UtSV2cQOFivWZNjhtARYKR3YndY1wWl1eRhRI_bRlrwSPEpsSVXc9856mqCx1djP8MeZy4_VZ8-s3ssq7l4Dw48Id_rYgnjEimRfQ4g9vg9VdtkeCUi3PrQQIZ9jqHDLDXwjInaEJqunkPch7IJiekL3-Y7CZVKumIiP0vB-5TX9-cVQmYFCSzjHUu667RK2PsCBl1d2pWDG6JmpQkC"
  },
  {
    category: "Advice",
    title: "Modern Dating Etiquette",
    excerpt: "Navigate the world of modern dating with confidence and grace in any social situation.",
    readTime: "5",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQqVK_eTJoenywjakg7GsG4AjFoio8V568OklxblrGrwZSMMdRwXmfPBXYtBQXFyZ9GvhZtxZPrpCM9IX-3jPYZuWYgdZ0QNWaptVf8sR-B05O4Dti9EDOz_16vKmmjDEeSxCg8_vSdwwsMK4TtitRMyB7EG9G6ltTKPkkd3M_qhn4sCt1VwC4epMV2KQmHCFJFsqUQm1HLeaFgAl_hYoGVaL-7n-QoH79ZLSUfyqQmGUAR5602Yd968BQsfNaSaZJaxMY0FfsO4O5"
  },
  {
    category: "Success Story",
    title: "The Perfect Match: David & Emma",
    excerpt: "How a casual coffee date turned into a lifelong commitment for this unexpected pair.",
    readTime: "6",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFWCn3WF2nZgHDyrzkMtxpFxeJC215Tl4v-fwPQasRdESLgFrcD1TgNoClY3ppWVahNJUfmYzK65EG7y-wbIK1O9tpxSi-ai52FqA_L8AkR8TWSlaxAflqLMg_Z-Iuw28fL5RsmegPKJWVlmOPyGe59IoTKkEBIRSwJulsfY1v5hGfSpt4UHelNezmAqwGVuOknGgdo_y3v6B4Wsb4jwIrU6619YZyoysHSkjctFTLFq6uqAVvvkdza9EgwMVPzE2cHJksHyDGQPH8"
  }
];

export default function BlogPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col font-display text-[#111418] bg-white dark:bg-background-dark overflow-x-hidden antialiased">
      <Header />
      <main className="flex-1 mt-16">
        {/* Featured Story */}
        <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-8 md:py-10">
          <div className="flex flex-col gap-6 md:flex-row bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
            <div
              className="w-full md:w-3/5 bg-center bg-no-repeat aspect-video bg-cover"
              role="img"
              aria-label="Happy young couple smiling and embracing in a sunlit park"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAFjAdRrZOxurvyLqr9Tk-GV0kOrP9nTdTpdZziOTk2azyb0CPFi_aHJfg18m9e3sxR-o4MJrMVmYadj-RhKal5-v7iC6ePRvcxaF7cOsQPPd29J7ApHtE80HwblqPk2ClWNCQdWPRvRBTrWTbpV9ZAVvcEuHCwQLOpiuIyMlubtDYF0xh9Lo3CNSJAYxy8CwYVwhJEj3hzbDjFRTpsa6xE9-ZX2jndkHoBHz9GTLlraFrvgpSVcr8fhCvlb6m0xoh4X3te0yskX20a")' }}
            />
            <div className="flex flex-col gap-6 p-8 md:w-2/5 justify-center">
              <div className="flex flex-col gap-4">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary w-fit uppercase tracking-wider">
                  Featured Success Story
                </span>
                <h1 className="text-[#111418] dark:text-white text-3xl font-black leading-tight tracking-[-0.033em] sm:text-4xl">
                  From First Swipe to 'I Do': Sarah & Mark’s Journey
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                  Discover how Sarah and Mark found lasting love on ConnectHub and their heartfelt advice for navigating the modern dating world.
                </p>
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <Clock className="w-4 h-4" />
                  <span>8 min read</span>
                  <span className="mx-1">•</span>
                  <span>Oct 24, 2023</span>
                </div>
              </div>
              <Button className="max-w-fit">
                Read Their Story
              </Button>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-4">
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {BLOG_CATEGORIES.map((category, index) => (
              <div
                key={index}
                className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-6 cursor-pointer transition-colors ${
                  index === 0
                    ? "bg-primary text-white font-semibold"
                    : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#111418] dark:text-slate-300 hover:border-primary font-medium"
                }`}
              >
                <p className="text-sm">{category}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Article Grid */}
        <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {ARTICLES.map((article, index) => (
              <ArticleCard key={index} {...article} />
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-12">
          <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-6 md:p-12 text-center border border-primary/20">
            <h2 className="text-[#111418] dark:text-white text-2xl md:text-3xl font-bold mb-4">Never miss a story.</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-lg mx-auto">
              Subscribe to our newsletter for the latest dating advice, success stories, and platform updates delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                className="flex-1 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none text-[#111418] dark:text-white"
                placeholder="Enter your email"
                type="email"
              />
              <button
                className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary/90 transition-colors"
                type="submit"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>

        {/* Pagination */}
        <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-12">
          <div className="flex items-center justify-center gap-2">
            <a className="flex size-10 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary transition-colors" href="#">
              <ChevronLeft className="w-5 h-5 text-[#111418] dark:text-slate-300" />
            </a>
            <a className="text-sm font-bold flex size-10 items-center justify-center text-white rounded-lg bg-primary" href="#">1</a>
            <a className="text-sm font-medium flex size-10 items-center justify-center text-[#111418] dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" href="#">2</a>
            <a className="text-sm font-medium flex size-10 items-center justify-center text-[#111418] dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" href="#">3</a>
            <span className="text-slate-400 mx-1">...</span>
            <a className="text-sm font-medium flex size-10 items-center justify-center text-[#111418] dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" href="#">12</a>
            <a className="flex size-10 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary transition-colors" href="#">
              <ChevronRight className="w-5 h-5 text-[#111418] dark:text-slate-300" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
