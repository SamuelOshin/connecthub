import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HelpCategoryCard } from "@/components/features/help/HelpCategoryCard";
import { FAQItem } from "@/components/features/help/FAQItem";
import { Search, Home, User, Star, ShieldAlert, Wrench, ThumbsUp, ThumbsDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/Button";

const HELP_CATEGORIES = [
  {
    icon: User,
    title: "Account & Profile",
    description: "Managing photos, bio tips, and account settings."
  },
  {
    icon: Star,
    title: "Premium Features",
    description: "Subscriptions, Boosts, and payment issues."
  },
  {
    icon: ShieldAlert,
    title: "Safety & Reporting",
    description: "Reporting, blocking, and safety guidelines."
  },
  {
    icon: Wrench,
    title: "Troubleshooting",
    description: "App crashes, login errors, and bug reporting."
  }
];

const FAQS = [
  {
    question: "How do I verify my profile?",
    answer: "To verify your profile, go to your profile settings and click the 'Get Verified' button. You'll be asked to take a selfie mimicking a specific pose. Our team will review it within 24 hours."
  },
  {
    question: "What happens when I unmatch someone?",
    answer: "When you unmatch someone, they will disappear from your match list and vice versa. This action is permanent and cannot be undone."
  },
  {
    question: "How do I cancel my Gold subscription?",
    answer: "Subscriptions are managed through your phone's App Store or Google Play Store. Go to your phone settings > Subscriptions to manage or cancel."
  },
  {
    question: "Can I use ConnectHub for free?",
    answer: "Yes! The core features of matching and chatting are free for everyone. Premium features like Boosts and seeing who likes you are available for purchase."
  }
];

export default function HelpPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col font-display text-[#111418] bg-white dark:bg-background-dark overflow-x-hidden antialiased">
      <Header />
      <main className="flex-1 mt-16 flex flex-col items-center">
        <div className="layout-content-container flex flex-col w-full max-w-[1200px] flex-1">

          {/* Search Hero */}
          <div className="p-4 md:p-10 w-full">
            <div
              className="flex min-h-[380px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-8 text-center"
              style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuARN12_jeX0OkcM3K6Up8L_JLFgTXYHwLi-b_B3y9RPrRZBRk_CI53nAt7SDQEah3h8Pbl86shQarTrUIdSspWI7xvcj9L2NenZejrEZFe7qmdpaGe2hWKGA8tRmj7xLBZMOky1YhgZUCa80o7Nkz0fkCjAuv90TE7We3pL7XKKnNFwl2Op-hf8ie8_Mz0m7WtfnYbhH1sG1C9Y5cb5kKgKZcNwR3Vh8s-L_4xdDT5NViIIglW8q_XjawTB9fvS5nSsVAfvfYoV_gdV")' }}
            >
              <div className="flex flex-col gap-3">
                <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-6xl font-display">
                  How can we help you?
                </h1>
                <p className="text-white/90 text-base md:text-lg font-normal max-w-2xl mx-auto">
                  Search our knowledge base for answers to your questions about profiles, safety, and more.
                </p>
              </div>
              <div className="w-full max-w-xl mt-4 relative group">
                <div className="flex w-full items-stretch rounded-full h-14 md:h-16 overflow-hidden bg-white shadow-xl">
                  <div className="text-[#5f758c] flex items-center justify-center pl-6">
                    <Search className="w-6 h-6" />
                  </div>
                  <input
                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden text-[#111418] focus:outline-none border-none bg-white placeholder:text-[#5f758c] px-4 text-base font-normal leading-normal"
                    placeholder="Search for articles or keywords..."
                  />
                  <div className="flex items-center justify-center pr-2">
                    <Button className="h-10 md:h-12 px-6 rounded-full hover:scale-105 transition-transform">
                      Search
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-3 mt-4 text-white/80 text-sm">
                  <span>Popular:</span>
                  <a href="#" className="underline hover:text-white">Verify Profile</a>
                  <a href="#" className="underline hover:text-white">Cancel Subscription</a>
                  <a href="#" className="underline hover:text-white">Safety Tips</a>
                </div>
              </div>
            </div>
          </div>

          {/* Breadcrumbs */}
          <div className="flex flex-wrap gap-2 px-10 py-2">
            <Link href="/" className="text-[#5f758c] dark:text-gray-400 text-sm font-medium leading-normal flex items-center gap-1 hover:text-primary transition-colors">
              <Home className="w-4 h-4" /> Home
            </Link>
            <span className="text-[#5f758c] text-sm font-medium leading-normal">/</span>
            <span className="text-[#111418] dark:text-white text-sm font-semibold leading-normal">Help Center</span>
          </div>

          {/* Categories Grid */}
          <div className="px-6 py-4">
            <h2 className="text-[#111418] dark:text-white text-2xl font-bold leading-tight tracking-[-0.015em] px-4 pb-6 pt-5 font-display">Browse by Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
              {HELP_CATEGORIES.map((cat, index) => (
                <HelpCategoryCard key={index} {...cat} />
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="px-10 py-10 w-full max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[#111418] dark:text-white text-2xl font-bold font-display">Frequently Asked Questions</h2>
              <Link href="#" className="text-primary font-semibold text-sm hover:underline">View All</Link>
            </div>
            <div className="space-y-4">
              {FAQS.map((faq, index) => (
                <FAQItem key={index} {...faq} />
              ))}
            </div>

            {/* Feedback */}
            <div className="mt-8 pt-8 border-t border-[#dbe0e6] dark:border-gray-700 flex flex-col items-center gap-4">
              <p className="text-[#111418] dark:text-white font-medium">Was this information helpful?</p>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 px-6 py-2 rounded-full border border-[#dbe0e6] dark:border-gray-700 hover:bg-background-light dark:hover:bg-gray-800 transition-colors">
                  <ThumbsUp className="w-5 h-5 text-green-500" />
                  <span>Yes</span>
                </button>
                <button className="flex items-center gap-2 px-6 py-2 rounded-full border border-[#dbe0e6] dark:border-gray-700 hover:bg-background-light dark:hover:bg-gray-800 transition-colors">
                  <ThumbsDown className="w-5 h-5 text-red-500" />
                  <span>No</span>
                </button>
              </div>
            </div>
          </div>

          {/* Contact Support CTA */}
          <div className="m-10 p-8 rounded-2xl bg-primary/5 dark:bg-primary/10 border-2 border-dashed border-primary/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col gap-2 text-center md:text-left">
              <h2 className="text-[#111418] dark:text-white text-2xl font-bold font-display">Still need help?</h2>
              <p className="text-[#5f758c] dark:text-gray-400">Can't find what you're looking for? Our support team is here to help 24/7.</p>
            </div>
            <Button size="lg" className="rounded-full shadow-lg hover:scale-105 transition-transform">
              Contact Support
            </Button>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
