import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
    SafetyHero,
    SafetyResourceCard,
    ReportingProcess,
    VerificationBanner,
    EmergencyResources
} from "@/components/features/safety/SafetyComponents";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const RESOURCES = [
    {
        title: "Dating Safety",
        description: "Essential advice for online and in-person dating success.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuRZ3sbAIWOCD2pgGDPqjyx9VOg0VBBePSPo4I5JewOAGbzz4ACTFsksNW88SChCptNNI6Pd1M9t5j-TRkqLeS4VQeW4i4pun4Xr4nhsXLfyC0FUH-9wjfJfnUKb38JCqE8x6frL8_DEfNhYIe4Wv1nQDNTNNZOMyBxfSnZDxgpW4BhfJkGGsZey6NDKl8H65m7DSwj6wkRxpVeJ9ZlukpxCmoBUYV84UGkn1lv4WAe7nxr2HPawtwB9tDmgXZYnDt6cSv5X-OJG4W",
        label: "Safety Tips"
    },
    {
        title: "How to Report",
        description: "A transparent look at our moderation and safety process.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPwNtjcnMBjgdbEeAlRnn_ZbRt0yTw9mXpSzSxfCBshlNXrdB1BOD3tKKequFClbHIXmb0MTb7Fs3UxzW6SWM-NqNrLqNYUOK27jeK_Bpc9uzqupw6NxXdxkG-QPfyYMYWYvUkhjZe0EygcnnaI8YgLKltY0mjmpc3-tDNxJjeZvr1CwzSga4OyN7G52lZyTy344KlgbAaN3Rz761MBZnLZuBKurH_Hjbjyr6yc0aJbI88PfqfCCZlaxAynZS7BYRAD-QO6Uzk2ewB",
        label: "Reporting"
    },
    {
        title: "Verification",
        description: "Learn about the benefits of the blue checkmark system.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAMWlOCnvjsuWsxEzoA3hjkT6MHCFvP_7Aqo028bi7_2L7w8AklPyi8UmMdbrYgLldMg2BjRKnvNhBu2OcflFLD-jPkGyQkAkhM_8hko5KjjB3q5RC2puz76DApSiTwpfW1PZTXgm_jhfTu8S8SSCaUxwHhzxlvYQBfP6BWYtnkNqrV4Itl2JAr-LY8a7BeLlVOgrmQyHJeHzDsf-7vWStHSA5sFA3-LWo9eFARSyXCGZsMrVJUm85_uNRLbsMzudO-T5xp8Ahvw74",
        label: "Verified"
    },
    {
        title: "Our Standards",
        description: "Our community standards for a positive experience for all.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcpRprxKxnAT1iJSYLZFGSnBexJnTC9IZ-IlH5u6FwBV6B-yWqvr18I4tLDXiSDNO1Gqc08IrDfOGaybcbNmNEKzaCU2-WY0Ac-UfZnqYv0Sa0mKVdox4CdTRrwM3uF_R5xKi3qr8s1aDN7Xdvq-4cBfmbgr6UcSRKXx-_0Jae-KeN1UMdizH-FXt7xTl8KMKoeEP_b1kR-L1Nn83FlDNb55EB9OsJoiTy-eAWnrpmYsD9Hoo00eLRbN1GGDCEcCZIeba4--GVu4YS",
        label: "Guidelines"
    }
];

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-[#101418] dark:text-white transition-colors duration-300">
      <Header />
      <main className="max-w-[1200px] mx-auto px-6 py-24">
        <SafetyHero />

        <div className="flex items-center justify-between mb-8 px-4">
            <h2 className="text-[#101418] dark:text-white text-2xl font-bold tracking-tight">Essential Resources</h2>
            <Link href="#" className="text-primary font-semibold text-sm flex items-center gap-1 hover:underline">
                View All <ArrowRight className="w-4 h-4" />
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 mb-16">
            {RESOURCES.map((resource, i) => (
                <SafetyResourceCard key={i} {...resource} />
            ))}
        </div>

        <ReportingProcess />
        <VerificationBanner />
        <EmergencyResources />
      </main>
      <Footer />
    </div>
  );
}
