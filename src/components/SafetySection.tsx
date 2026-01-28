import { Shield, ShieldCheck, Lock, Ban, Headset, ShieldAlert, Fingerprint, EyeOff } from "lucide-react";

export function SafetySection() {
  const features = [
    { icon: <ShieldCheck />, color: "text-blue-500 bg-blue-50", title: "Profile Verification", desc: "Photo verification to prevent catfishing." },
    { icon: <Lock />, color: "text-purple-500 bg-purple-50", title: "End-to-End Encryption", desc: "Your chats are private and secure." },
    { icon: <Ban />, color: "text-red-500 bg-red-50", title: "Zero Tolerance", desc: "Immediate action on reported abuse." },
    { icon: <Headset />, color: "text-orange-500 bg-orange-50", title: "24/7 Support", desc: "Real humans ready to help anytime." },
  ];

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900/50 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            <div className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider">
              <Shield className="w-4 h-4" />
              Safety First
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Trusted by Millions for a <br/>Safe Dating Experience
            </h2>
            <p className="text-lg text-slate-600 dark:text-gray-300 leading-relaxed">
              We take your safety seriously. Our dedicated team and advanced AI work 24/7 to ensure ConnectHub remains a secure space for everyone.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className={`mt-1 p-2 rounded-lg ${feature.color}`}>
                    <div className="w-6 h-6">{feature.icon}</div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{feature.title}</h4>
                    <p className="text-sm text-slate-500 mt-1">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-square bg-white dark:bg-slate-800 rounded-[3rem] p-8 shadow-2xl border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center text-center gap-6 overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,#f0f9ff_0%,#e0f2fe_100%)] opacity-50"></div>

              <div className="relative z-10 w-32 h-32 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 mb-4">
                <ShieldAlert className="w-16 h-16" />
              </div>

              <h3 className="relative z-10 text-2xl font-bold text-slate-900 dark:text-white">Your Privacy is Our Priority</h3>
              <p className="relative z-10 text-slate-500 dark:text-slate-400 max-w-xs">We implement the highest industry standards to protect your personal data.</p>

              <div className="relative z-10 mt-4 flex -space-x-4">
                 <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center text-slate-400"><ShieldCheck className="w-6 h-6"/></div>
                 <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center text-slate-400"><Fingerprint className="w-6 h-6"/></div>
                 <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center text-slate-400"><EyeOff className="w-6 h-6"/></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
