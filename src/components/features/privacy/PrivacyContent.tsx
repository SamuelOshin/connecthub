import {
  Database,
  IdCard,
  Activity,
  Lightbulb,
  BarChart,
  CheckCircle,
  Shield,
  FileEdit,
  Trash2,
  Ban,
  Download,
  Share2,
  Cookie,
  Lock,
  LucideIcon
} from "lucide-react";
import { PRIVACY_CONTENT } from "./privacyData";

const ICON_MAP: Record<string, LucideIcon> = {
    database: Database,
    badge: IdCard,
    timeline: Activity,
    lightbulb: Lightbulb,
    bar_chart: BarChart,
    check_circle: CheckCircle,
    shield_person: Shield,
    edit_note: FileEdit,
    delete_forever: Trash2,
    do_not_disturb_on: Ban,
    download_for_offline: Download,
    share: Share2,
    cookie: Cookie,
    lock: Lock,
    download: Download
};

export function PrivacyContent() {
  const { intro, sections } = PRIVACY_CONTENT;

  const renderSectionIcon = (iconName: string) => {
      const Icon = ICON_MAP[iconName];
      return Icon ? <Icon className="w-6 h-6" /> : null;
  };

  const renderSubsectionIcon = (iconName: string) => {
      const Icon = ICON_MAP[iconName];
      return Icon ? <Icon className="text-primary w-4 h-4" /> : null;
  };

  const renderCardIcon = (iconName: string) => {
      const Icon = ICON_MAP[iconName];
      return Icon ? <Icon className="text-primary w-6 h-6 mb-2" /> : null;
  };

  return (
    <div className="flex-1 max-w-[800px]">
        {/* Intro */}
        <section className="mb-12">
            <p className="text-lg leading-relaxed text-[#101418] dark:text-slate-200">
                {intro}
            </p>
        </section>

        {sections.map((section) => (
            <article key={section.id} id={section.id} className="mb-16 scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {renderSectionIcon(section.icon)}
                    </div>
                    <h2 className="text-[#101418] dark:text-white text-3xl font-bold tracking-tight">{section.title}</h2>
                </div>
                <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed">
                    <p>{section.content}</p>

                    {/* Subsections (Data We Collect) */}
                    {section.subsections && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                            {section.subsections.map((sub, idx) => (
                                <div key={idx} className="p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-sm">
                                    <h4 className="font-bold text-[#101418] dark:text-white mb-2 flex items-center gap-2">
                                        {renderSubsectionIcon(sub.icon)} {sub.title}
                                    </h4>
                                    <ul className="list-disc list-inside space-y-1.5 text-sm marker:text-primary">
                                        {sub.items.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Summary Box */}
                    {section.summary && (
                        <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-xl">
                            <div className="flex gap-4">
                                <Lightbulb className="text-primary w-6 h-6 flex-shrink-0" />
                                <div>
                                    <p className="text-[#101418] dark:text-white font-bold mb-1 italic">The "Plain English" Summary</p>
                                    <p className="text-sm">{section.summary}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* List (How We Use) */}
                    {section.list && (
                        <ul className="space-y-4">
                            {section.list.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-white dark:hover:bg-slate-900 transition-colors">
                                    <CheckCircle className="text-primary w-6 h-6 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* Cards (Rights) */}
                    {section.cards && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {section.cards.map((card, idx) => (
                                <div key={idx} className="p-5 bg-background-light dark:bg-slate-800 rounded-xl border border-transparent hover:border-primary/20 hover:bg-white dark:hover:bg-slate-700 hover:shadow-md transition-all">
                                    {renderCardIcon(card.icon)}
                                    <h4 className="font-bold text-[#101418] dark:text-white mb-1">{card.title}</h4>
                                    <p className="text-sm">{card.desc}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </article>
        ))}

        {/* Footer Banner */}
        <div className="mt-20 p-8 bg-gradient-to-br from-primary to-blue-600 rounded-2xl text-white text-center shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="mb-8 text-blue-50 max-w-lg mx-auto">Our dedicated privacy and safety team is available to help you understand how your data is used and protected.</p>
            <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-white text-primary px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-md">
                    Email Privacy Team
                </button>
                 <button className="bg-white/20 border border-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-bold hover:bg-white/30 transition-colors">
                    Visit Safety Center
                </button>
            </div>
        </div>
    </div>
  );
}
