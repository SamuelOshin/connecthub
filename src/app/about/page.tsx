import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CoreValueCard } from "@/components/features/about/CoreValueCard";
import { TeamMemberCard } from "@/components/features/about/TeamMemberCard";
import { ShieldCheck, Lock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const CORE_VALUES = [
  {
    icon: ShieldCheck,
    title: "Authenticity",
    description: "Verified profiles and real people. We use advanced human-review systems to ensure no bots, just genuine humans."
  },
  {
    icon: Lock,
    title: "Safety",
    description: "Top-tier encryption and active community moderation to keep your experience secure and your data private."
  },
  {
    icon: Heart,
    title: "Connection",
    description: "Algorithms built for quality, not quantity. We prioritize emotional depth over the endless swipe culture."
  }
];

const TEAM_MEMBERS = [
  {
    name: "Sarah Jenkins",
    role: "Founder & CEO",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5GRLvDTo4nXHaZG6ZDJdIKpDXWG-zmqBkCUCat5JwGEXPj5Ism8y5LGauH8lGa66BKTmsGiHP5AUZf3HcPo-eOfrATTGic8CEI4m_oN5AoGkBVLGRcuj8QZC6GDprdfKDCrX2NUcY1xh9-VC5Z6YYLC8xGsA0JJ5loZyMDoYUFZini7jXz9wq4g1PPuMiV6hYSbrFDiLZ5dyy4oR1azYsrHqKivaTIQORQCkMowsRMrSpql7q7KkHli-w2zbHobT5DIL91Ht-gul4"
  },
  {
    name: "Marcus Chen",
    role: "Head of Engineering",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjr9HdrD35znSKohoa-YDwapmSC_oqmKJoIO4UnBFcsNHdLSZpgHRqX1-aqUwpHEsKS2MZ8q1d5vMzsyFfnlCfyRhzPeR0iy83NpxC2KBkAc8PPekaJKyMKU8LLmaZPmubyRjzBKmeMwwzXf8Ik4074lcHRCiRSVG0IF2fLf58EV0zOQYwInE-y_umD460bldPI2CrHZcXX9HO05AqQX_uOGCnouCcNiTPzXJlRgaaARN3Dh6vwextDS7sXi0R5q2DfI4iRiacUffK"
  },
  {
    name: "Elena Rodriguez",
    role: "Lead Designer",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCi8coNJRpWvxXFAB42oDT4cuITIVXNvo-_eE1uQzt57ZlzAoUD_XX_D_L7S4yCTfknjVqZD5lsumU3q5mAOtanB9AQhAS1SSr1bG5TIJYQQq1ggIXlaVtxm93y7j0_UzNsS1VJNiySmsRulI7Ll71Ak6UEpb0s4p-Wl6dpACZ49-LRhOri4xWY09jlhB_KOOkSilQRci4N6S977KAHYel1bB8LSzjiCojWwcy_FAO74d3N7xVRadhSscr0ZJ8VZ2ImvpYT895dlymT"
  },
  {
    name: "David Miller",
    role: "Safety & Ethics",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAw8fV61G7H1qwmcZ-bIZ_ksYmCexaAUh1LvyTeHT6LcUbXiNVOUXufoGwIxLdM6Hdl1zgsC7xu-3pid3zEZ28lpz7iju4fNWpC6_CaPE1a6ouQNq4l1muPlAZVdv5XsdrXqmoDn2zFndOX-stBGMfXO7_x9p92fHvCsl7g8XUjPoWCB56wVXJGq5cVP2A0uUylFrNXTgjFIV97Tl6h_gahE2P4alawRXO-7a1YcjoSYGxsI8fFLLIi8SMsu_oIqiQYFjllX3m7qAiH"
  }
];

export default function AboutPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col font-display text-[#111418] bg-white dark:bg-background-dark overflow-x-hidden antialiased">
      <Header />
      <main className="flex-1 mt-16">
        {/* Mission Section */}
        <section className="px-4 md:px-10 lg:px-40 flex justify-center py-12 lg:py-20">
          <div className="flex flex-col gap-8 lg:flex-row items-center max-w-[1200px] w-full">
            <div className="w-full lg:w-1/2 flex flex-col gap-6 lg:gap-8">
              <div className="flex flex-col gap-4 text-left">
                <span className="text-primary font-bold tracking-widest uppercase text-sm">Our Mission</span>
                <h1 className="text-[#111418] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl lg:text-6xl">
                  Redefining digital intimacy through intentional design.
                </h1>
                <h2 className="text-[#637588] dark:text-slate-400 text-lg font-normal leading-relaxed max-w-[500px]">
                  ConnectHub is more than just an app; it's a movement towards real, lasting connections in a digital world that often feels superficial.
                </h2>
              </div>
              <div className="flex gap-4">
                <Button size="lg" className="rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                  Join the Movement
                </Button>
              </div>
            </div>
            <div
              className="w-full lg:w-1/2 h-[400px] lg:h-[500px] bg-center bg-no-repeat bg-cover rounded-xl shadow-2xl"
              role="img"
              aria-label="Happy couple laughing together in an outdoor park setting"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDtW-VvCgNKQOrDQy2eTZrx4pnMH890loEw9koKjuRBHKMe7ffcMGQ56DlFNaoKzXK2E80DADb9UCmTAoFNj7-6DmZzXxPZ0CLNFUp5Vync0RU-ILgI-K1_pdrPfxj0tSXQenj6VaKrVI8ZXH4YUoRAjyxDppm0TRXuhVYMcCB8Oki7NJGnjxD4GP_HEpzXJwvuxFzDrJQ0Sl7rkIGUzCoxX7G5gM9VX1e0jQgHrjr1-OvpOaofEAZ6R5ZrXkFScCCSXbqEGfMX66Vn")' }}
            />
          </div>
        </section>

        {/* Core Values Section */}
        <section className="bg-white dark:bg-slate-900/50 py-16 md:py-20 px-4 md:px-10 lg:px-40">
          <div className="max-w-[1200px] mx-auto flex flex-col gap-10">
            <div className="flex flex-col gap-4 text-center items-center">
              <h2 className="text-[#111418] dark:text-white tracking-tight text-3xl font-bold leading-tight sm:text-4xl">
                Our Core Values
              </h2>
              <p className="text-[#637588] dark:text-slate-400 text-lg font-normal leading-normal max-w-[720px]">
                At the heart of ConnectHub are the principles that guide every single feature we build and every interaction we facilitate.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CORE_VALUES.map((value, index) => (
                <CoreValueCard key={index} {...value} />
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="px-4 md:px-10 lg:px-40 py-16 md:py-20 bg-background-light dark:bg-background-dark">
          <div className="max-w-[1200px] mx-auto flex flex-col items-center">
            <div className="w-full max-w-[800px] text-center mb-12">
              <h2 className="text-[#111418] dark:text-white text-3xl font-bold mb-6">The Story Behind ConnectHub</h2>
              <p className="text-[#637588] dark:text-slate-400 text-lg leading-relaxed">
                ConnectHub began in 2022 when our founders realized that dating apps were becoming more about the game than the connection. Tired of the "swipe-burnout," we set out to build a platform that rewards intentionality and celebrates the beauty of human vulnerability.
              </p>
            </div>
            <div
              className="w-full aspect-[21/9] bg-center bg-cover rounded-xl shadow-lg"
              role="img"
              aria-label="Team members collaborating around a wooden table in a bright office"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDJ9iccGskLl9TsOs2ZpbD95K0VJp4x8Zl_PsTyGLBeS60irp_EM13dNTHrZCRLMljPhMJcgUXSkyElXX5P-V3xfq4HDChUEb5l-DnrSnYzuYiNveIQpE0_UXGCmxB5yUNP5rF2j3AGA0iwWEujhd0xDk1JbZUZPmOp8VDUBW7UJCJBoUxjX-NFCvJoI0HO4GWDqsfYQCGhCHjrk_TmaVvrz1QF2fZzZJiiRMMcEBKGDLd0FFkLzGY4kMUz1vGR-lqDvLeImCmx7WWi")' }}
            />
          </div>
        </section>

        {/* Team Section */}
        <section className="px-4 md:px-10 lg:px-40 py-16 md:py-20 bg-white dark:bg-slate-900/50">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-[#111418] dark:text-white text-3xl font-bold mb-4">Meet the Visionaries</h2>
              <p className="text-[#637588] dark:text-slate-400">The humans building a more human digital experience.</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
              {TEAM_MEMBERS.map((member, index) => (
                <TeamMemberCard key={index} {...member} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 md:px-10 lg:px-40 py-16 md:py-24">
          <div className="max-w-[1200px] mx-auto rounded-xl bg-primary p-8 md:p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 size-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 size-64 bg-black/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6">Ready to find your connection?</h2>
              <p className="text-white/80 text-base md:text-lg mb-8 md:mb-10 max-w-2xl mx-auto">
                Join thousands of people who have already transitioned from digital chatting to meaningful, real-life relationships.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-primary font-bold px-8 py-3 md:px-10 md:py-4 rounded-full hover:bg-slate-100 transition-colors shadow-xl text-sm md:text-base">
                  Download Now
                </button>
                <button className="bg-primary/20 border border-white/30 backdrop-blur-sm text-white font-bold px-8 py-3 md:px-10 md:py-4 rounded-full hover:bg-white/10 transition-colors text-sm md:text-base">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
