import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <div className="w-full py-20 px-4 bg-white dark:bg-background-dark">
      <div className="max-w-5xl mx-auto bg-primary rounded-[2.5rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-600/20">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-black opacity-10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

        <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">Ready to find your match?</h2>
        <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 relative z-10">
          Join the fastest growing dating community today. Your perfect match might be just one click away.
        </p>
        <div className="flex justify-center">
            <Button variant="white" size="lg" className="relative z-10 hover:scale-105 text-primary">Get Started Now</Button>
        </div>
      </div>
    </div>
  );
}
