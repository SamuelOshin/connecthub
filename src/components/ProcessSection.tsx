import { UserPlus, Search, CheckCircle } from "lucide-react";

export function ProcessSection() {
  const steps = [
    {
      icon: <UserPlus className="w-10 h-10" />,
      title: "Create Profile",
      desc: "Quick sign up. Verify your photo to get the trusted badge.",
      color: "primary",
      shadow: "shadow-blue-100",
      border: "border-blue-50"
    },
    {
      icon: <Search className="w-10 h-10" />,
      title: "Browse Matches",
      desc: "Smart filters help you find exactly who you're looking for.",
      color: "accent",
      shadow: "shadow-orange-100",
      border: "border-orange-50"
    },
    {
      icon: <CheckCircle className="w-10 h-10" />,
      title: "Connect Safely",
      desc: "Chat securely and meet up when you're ready.",
      color: "primary",
      shadow: "shadow-blue-100",
      border: "border-blue-50"
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-background-dark py-24 px-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
          <span className="text-primary font-bold tracking-wider text-sm uppercase">Simple Process</span>
          <h2 className="text-slate-900 dark:text-white text-3xl sm:text-4xl font-extrabold tracking-tight">How ConnectHub Works</h2>
          <p className="text-slate-500 dark:text-gray-400 text-lg">Three simple steps to finding your meaningful connection in a safe environment.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 -z-10"></div>

          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center gap-6 group">
              <div className={`w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border-4 ${step.border} ${step.shadow} ${step.color === 'primary' ? 'text-primary' : 'text-accent'}`}>
                {step.icon}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed px-8">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
