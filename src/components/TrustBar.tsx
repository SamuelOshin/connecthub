import { ShieldCheck, Lock, Ban, Headset } from "lucide-react";

export function TrustBar() {
  const items = [
    { icon: <ShieldCheck className="w-8 h-8" />, label: "Verified Profiles" },
    { icon: <Lock className="w-8 h-8" />, label: "AES Encryption" },
    { icon: <Ban className="w-8 h-8" />, label: "Zero Tolerance" },
    { icon: <Headset className="w-8 h-8" />, label: "24/7 Support" },
  ];

  return (
    <div className="w-full bg-white border-b border-slate-100 dark:bg-slate-900 dark:border-slate-800 py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-8">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
            <span className="text-primary text-2xl">{item.icon}</span>
            <span className="font-semibold text-sm uppercase tracking-wide">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
