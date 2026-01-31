import { Quote, Star, Heart } from "lucide-react";

export function TestimonialSection() {
  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900/50 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-[3rem] p-8 md:p-12 shadow-xl border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="w-full md:w-1/2 relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg relative">
              <img 
                alt="Happy Couple" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYg4TYQ3SBPJjn4sH2fuhkKxh8z0AG0bTXrd5NJH9GrnipWVJLNNxNBYdNjF2uSx4Q10i-JNbeLeFYiQ96Oze5msZZpc_uCOGMAo1H1u_5oXmGrMw32kK0ILMGF_eEGQFJ7cvAE6nWKn-l7iwUGhZp2ucPi5S0EMQ4RzOCvsspxJU9NXStWl-iPi1REQycwKSc6zJiTxaMcWS4LiSgh_zygKTeWhRJ_LWriJ8qxVPVDtLH0KkvYO8CWt9TVVM0B8TRXfp0_e2nFo42"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-2">
                <Heart className="w-4 h-4 fill-current" /> Success Story
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center shadow-lg">
              <Quote className="w-8 h-8 fill-current" />
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <div className="flex items-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
              "We never thought we'd find 'the one' online, but ConnectHub proved us wrong."
            </h3>
            <p className="text-slate-600 dark:text-gray-300 text-lg italic">
              The safety features made us feel comfortable, and the matching algorithm was spot on. We've been happily married for two years now!
            </p>
            <div className="mt-2">
              <p className="font-bold text-slate-900 dark:text-white">Sarah & James</p>
              <p className="text-sm text-slate-500">Met on ConnectHub in 2021</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
