import { UserPlus, Search, MessageSquare } from "lucide-react";

export function ProcessSection() {
  const steps = [
    {
      icon: <UserPlus className="w-10 h-10" />,
      color: "blue",
      title: "1. Create Profile",
      desc: "Sign up for free and set up your profile. Add photos and verify your identity.",
    },
    {
      icon: <Search className="w-10 h-10" />,
      color: "purple",
      title: "2. Browse Matches",
      desc: "Our smart algorithm suggests compatible matches based on your preferences.",
    },
    {
      icon: <MessageSquare className="w-10 h-10" />,
      color: "pink",
      title: "3. Connect & Chat",
      desc: "Start a conversation with your mutual matches and build a real connection.",
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-background-dark py-24 px-4 border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
          <span className="text-primary font-bold tracking-wider text-sm uppercase">Simple Process</span>
          <h2 className="text-slate-900 dark:text-white text-3xl sm:text-4xl font-extrabold tracking-tight">How ConnectHub Works</h2>
          <p className="text-slate-500 dark:text-gray-400 text-lg">Three simple steps to finding your meaningful connection in a safe environment.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-100 -z-10"></div>

          {steps.map((step, index) => {
             const colors = {
                blue: "bg-blue-50 text-primary border-blue-100",
                purple: "bg-purple-50 text-purple-600 border-purple-100",
                pink: "bg-pink-50 text-pink-600 border-pink-100",
             }
             return (
                <div key={index} className="flex flex-col items-center text-center gap-6 group">
                  <div className={`w-24 h-24 rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 border ${colors[step.color as keyof typeof colors]}`}>
                    {step.icon}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{step.title}</h3>
                    <p className="text-slate-500 leading-relaxed px-4">{step.desc}</p>
                  </div>
                </div>
             );
          })}
        </div>
      </div>
    </div>
  );
}
