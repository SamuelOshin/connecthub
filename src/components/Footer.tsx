import { Users } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2 flex flex-col gap-4 pr-8">
            <div className="flex items-center gap-2 text-white mb-2">
              <Users className="w-8 h-8" />
              <h2 className="text-xl font-bold tracking-tight">ConnectHub</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              ConnectHub is the leading platform for meaningful connections. We are dedicated to providing a safe, inclusive, and enjoyable dating experience for everyone.
            </p>
            <div className="flex gap-4 mt-2">
              {["fb", "tw", "ig"].map(social => (
                <Link key={social} href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <span className="font-bold text-xs">{social}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold">Company</h4>
            <ul className="flex flex-col gap-2 text-sm">
              {["About Us", "Careers", "Press", "Contact"].map(item => (
                <li key={item}><Link href="#" className="hover:text-white transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold">Legal</h4>
            <ul className="flex flex-col gap-2 text-sm">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"].map(item => (
                <li key={item}><Link href={item === "Privacy Policy" ? "/privacy" : "#"} className="hover:text-white transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold">Resources</h4>
             <ul className="flex flex-col gap-2 text-sm">
              {["Safety Tips", "Community Guidelines", "Success Stories", "Help Center"].map(item => (
                <li key={item}><Link href={item === "Safety Tips" ? "/safety" : "#"} className="hover:text-white transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2024 ConnectHub Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span>English (US)</span>
            <span>Mobile Version</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
