import { Search, Shield, Flag, Eye, CheckCircle2, Check, Phone, ArrowRight, MessageSquare, Lock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SafetyHero() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-primary mb-12">
      <div
        className="flex min-h-[420px] flex-col gap-6 items-center justify-center p-8 text-center bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(rgba(6, 123, 249, 0.9) 0%, rgba(6, 123, 249, 0.7) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDm6xonHz5MhptUsWn-uTIHb1d_NL165tbqGvDs1qvJqZ9YIVKhmxKQOKMHd_dqQU3yVnc2nGbObD2jRN1T_iM-H6qEx8SGWZN0ir5q4B9wVwOKCOWm652YcFJZo95PHaY9Wp1R9rgEkiZpuyP0Zbc07fGMyJV3afTKLWZuCeC1aGEcmkqaB9hSwsWfngE4viYWcSl7KVQ09gUJnNXuR_74EZuhfMtuVz1KRSxP8L_1rpJaU09vDY56ZWm98msP0l8Udvoz6PuMhun-")` }}
      >
        <div className="max-w-2xl space-y-4">
          <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-tight">
             Your Safety is Our Priority.
          </h1>
          <p className="text-white/90 text-base md:text-lg font-normal">
             Find resources, tips, and tools to help you stay safe while connecting with others on ConnectHub.
          </p>
        </div>
        <div className="w-full max-w-[540px] mt-4">
          <div className="flex bg-white rounded-full p-2 shadow-xl ring-1 ring-black/5">
            <input
              className="flex-1 min-w-0 border-0 focus:ring-0 text-slate-800 placeholder:text-slate-400 text-base px-6 outline-none bg-transparent"
              placeholder="How can we help you stay safe?"
              type="text"
            />
            <Button variant="default" className="rounded-full w-12 h-12 p-0 flex-shrink-0 flex items-center justify-center">
                <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ResourceCardProps {
    title: string;
    description: string;
    image: string;
    label: string;
}

export function SafetyResourceCard({ title, description, image, label }: ResourceCardProps) {
    return (
        <div className="group cursor-pointer">
            <div
                className="w-full aspect-square bg-cover bg-center rounded-xl mb-4 transition-transform group-hover:scale-[1.02] shadow-sm relative overflow-hidden"
                style={{ backgroundImage: `url("${image}")` }}
            >
                <div className="w-full h-full bg-black/10 rounded-xl flex items-end p-4">
                    <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary uppercase">{label}</span>
                </div>
            </div>
            <h3 className="text-[#101418] dark:text-white text-lg font-bold">{title}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mt-1">{description}</p>
        </div>
    );
}

export function ReportingProcess() {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-8 lg:p-12 mb-16 shadow-sm border border-slate-100 dark:border-slate-800">
            <div className="max-w-3xl mb-12">
                <h2 className="text-3xl font-bold mb-4 text-[#101418] dark:text-white">How the Reporting Process Works</h2>
                <p className="text-slate-500 dark:text-slate-400">Reporting is confidential and helps keep our community safe. Here is exactly what happens when you report a profile.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                 {/* Step 1 */}
                <div className="relative flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 ring-8 ring-primary/5">
                        <Flag className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-bold mb-2 text-[#101418] dark:text-white">1. You Submit Report</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Flag the profile or message. You can include details about what happened.</p>
                </div>
                 {/* Step 2 */}
                 <div className="relative flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 ring-8 ring-primary/5">
                        <Eye className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-bold mb-2 text-[#101418] dark:text-white">2. Team Reviews</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Our safety experts review the report manually within minutes, 24/7.</p>
                </div>
                 {/* Step 3 */}
                 <div className="relative flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 ring-8 ring-primary/5">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-bold mb-2 text-[#101418] dark:text-white">3. Action Taken</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">We take action, which may include warnings, suspension, or permanent bans.</p>
                </div>
            </div>
        </div>
    );
}

export function VerificationBanner() {
    return (
        <div className="bg-gradient-to-br from-primary to-blue-700 rounded-xl overflow-hidden mb-16">
            <div className="flex flex-col md:flex-row items-center">
                <div className="p-8 lg:p-16 md:w-1/2 text-white">
                    <div className="flex items-center gap-2 mb-4">
                        <Shield className="w-5 h-5 fill-current" />
                        <span className="uppercase tracking-widest text-xs font-bold">Member Verification</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Boost Trust with Verification</h2>
                    <ul className="space-y-4 mb-8">
                        <li className="flex items-start gap-3">
                            <Check className="text-blue-200 w-5 h-5" />
                            <span>Photo verification confirms you're the person in your pics.</span>
                        </li>
                         <li className="flex items-start gap-3">
                            <Check className="text-blue-200 w-5 h-5" />
                            <span>Verified profiles get 3x more meaningful connections.</span>
                        </li>
                         <li className="flex items-start gap-3">
                            <Check className="text-blue-200 w-5 h-5" />
                            <span>It shows the community you're serious about safety.</span>
                        </li>
                    </ul>
                    <Button variant="white" className="rounded-full px-8 py-3 h-auto font-bold text-primary">
                        Get Verified Now
                    </Button>
                </div>
                <div
                    className="md:w-1/2 h-64 md:h-full min-h-[300px] bg-cover bg-center"
                    style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCHRV10UVnG18R2vD_GP0pB4Nfp3N4hU9CZ9YNliJKN5XioYHC5lB0HbpIw28eWwHw7PKPXzSQTedN8Hal2NaieBNIIQfs269vzfglDOFQSWo2dtMszPeH6sEdwO28VUdP_04TRweeJNKqOo78a1nUEIhNeoCXdWZ1YAh8N--NYNjyM48D2ZHrOmfTjJK_rSH0HG94iiiear2wqqRsyFg-J4PJwxrWUM4_aaxFTc5nDgBACRftr8ALAkR0cwKTv-AtOhwF0PL4rbXAW")` }}
                ></div>
            </div>
        </div>
    );
}

export function EmergencyResources() {
    return (
        <div className="border-t border-slate-200 dark:border-slate-800 pt-16 pb-24">
            <div className="flex flex-col md:flex-row gap-12">
                <div className="md:w-1/3">
                    <h2 className="text-2xl font-bold mb-4 text-[#101418] dark:text-white">Emergency Resources</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">If you are in immediate danger, please contact local emergency services or the resources below.</p>
                    <div className="flex flex-col gap-4">
                        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl">
                            <span className="text-red-600 dark:text-red-400 font-bold block">International Emergency</span>
                            <span className="text-2xl font-black text-red-600 dark:text-red-400 flex items-center gap-2">
                                <Phone className="w-6 h-6" /> 911 / 112 / 999
                            </span>
                        </div>
                    </div>
                </div>
                <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                        <h4 className="font-bold mb-2 text-[#101418] dark:text-white">Crisis Text Line</h4>
                        <p className="text-sm text-slate-500 mb-4">Confidential 24/7 crisis counseling via text.</p>
                        <a href="#" className="text-primary font-bold text-sm flex items-center gap-1">Text HOME to 741741</a>
                    </div>
                     <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                        <h4 className="font-bold mb-2 text-[#101418] dark:text-white">RAINN Hotline</h4>
                        <p className="text-sm text-slate-500 mb-4">National Sexual Assault Support Network.</p>
                        <a href="#" className="text-primary font-bold text-sm flex items-center gap-1">Call 800-656-4673</a>
                    </div>
                     <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                        <h4 className="font-bold mb-2 text-[#101418] dark:text-white">Cyber Civil Rights</h4>
                        <p className="text-sm text-slate-500 mb-4">Support for victims of online harassment.</p>
                        <a href="#" className="text-primary font-bold text-sm flex items-center gap-1">Learn More</a>
                    </div>
                     <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                        <h4 className="font-bold mb-2 text-[#101418] dark:text-white">Local Law Enforcement</h4>
                        <p className="text-sm text-slate-500 mb-4">Guides on how to file a police report.</p>
                        <a href="#" className="text-primary font-bold text-sm flex items-center gap-1">Download Guide</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
