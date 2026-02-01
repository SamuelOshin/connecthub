"use client";

import {
  Trash,
  Plus,
  MapPin,
  BadgeCheck,
  Edit3,
  BrainCircuit,
  Sparkles,
  X,
  Save,
  Flag,
  Eye,
  Heart
} from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto w-full">
      {/* Page Specific Header Actions (simulated as top of content) */}
      <div className="flex items-center justify-between mb-8">
         <h1 className="text-3xl font-bold text-[#101418] dark:text-white hidden sm:block">Edit Profile</h1>
         <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300 text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <Eye className="w-5 h-5" />
            <span>View Public Profile</span>
         </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-12">
        {/* Photos Section */}
        <section className="xl:col-span-5 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#101418] dark:text-white">Profile Photos</h3>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">Drag to reorder</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Main Photo */}
            <div className="col-span-2 aspect-[4/3] relative group rounded-2xl overflow-hidden shadow-sm bg-gray-100 dark:bg-slate-800 ring-1 ring-black/5 dark:ring-white/5">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuApAkpoC9iYfyREV7JfGIt620zSsbKBc3uJJVDNyYXcrYgkUwrHww8TJg0Gzq9ra2gHXBK_u9ShivYI841OAsbdvB2La2avcmxRJr7p7IXrpFfx3ip3KzXVGUkVfpfC0mtj9gsjun8E-NWO42GBgoWkcWEuTAyAglR6ZJ1LjUqOgJBmJMniDAWK4m9mEnrtPLABoNbJFt-OIByhyiz4ba1eFzdIQRSzi_75QhcY9LCEddeBbqUTlTkwRNI05GCupPL4c2aTw2MSgNQX")' }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-white/90 p-2 rounded-full text-[#101418] hover:text-red-500 hover:bg-white transition-all shadow-sm backdrop-blur-sm">
                  <Trash className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-bold border border-white/20 shadow-lg">
                Main Photo
              </div>
            </div>

            {/* Photo 2 */}
            <div className="aspect-square relative group rounded-2xl overflow-hidden shadow-sm bg-gray-100 dark:bg-slate-800 ring-1 ring-black/5 dark:ring-white/5">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDqri7PSrxYtn0Br40HNHnSEopgnj3ReQHERJbNkd1Vmw7stTjKZh5LsgMdA5lCh1bkA9CzlWkYkLuBCjar3PwcpM_O9cHITqpxVqJKy87Vye8Zv63r1gPJOOhkN-emWkCw_vk1PWwvTvwADnq3G3Sdw9zN8V55D3F7TGx3QidEhUjTQUQ0YMcwlbWR7cTNPaMHcnAURnAw6k0glhp28OaYWnn-i3IHMY0ZfmvN8SfLV8Nfj9SdHLYlb7HN6NuwWLhLOJa5HkFeoy1C")' }}
              ></div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-start justify-end p-2 opacity-0 group-hover:opacity-100">
                <button className="bg-white/90 p-1.5 rounded-full text-[#101418] hover:text-red-500 transition-colors shadow-sm backdrop-blur-sm">
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Photo 3 */}
            <div className="aspect-square relative group rounded-2xl overflow-hidden shadow-sm bg-gray-100 dark:bg-slate-800 ring-1 ring-black/5 dark:ring-white/5">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC0pfo3YetfX055PHhEgbRbNsdRiVwEFeJi3kT_EIUnPErDQuSrdKec2v_cC2ar3Vv6QB5_Hrka9gW_K7MYxdjeE1bnjtK8lU7MzqcRrK7HL4bGZW97AJlVgzhEnrjKppYGOq9xUyiHtaqTXGm0oirkM19OPdgho5ro9pbTmUsEbayjx1ED3gIRNpX30TyBiAjjNGvj0WsvGH2P_KPkpdL_qE4qqOGX8L411juAjMSM8ZrU-QEmZuZGiZfta00Fh8uHlP66TcfunOi7")' }}
              ></div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-start justify-end p-2 opacity-0 group-hover:opacity-100">
                <button className="bg-white/90 p-1.5 rounded-full text-[#101418] hover:text-red-500 transition-colors shadow-sm backdrop-blur-sm">
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Photo 4 */}
            <div className="aspect-square relative group rounded-2xl overflow-hidden shadow-sm bg-gray-100 dark:bg-slate-800 ring-1 ring-black/5 dark:ring-white/5">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC05WHToDzlwuDGBellsJaxCTT8RpkrBW2OUm_vDIWlgmq3jqEg_BognpSTU3JxCXjen_zs6natQwO5fu5IH-ddkZYlVRH_DeMOCTlBvj8lfXj4F5CgeAY36FGkVR7RrbSUsG3k77jHQcLQvU2NPaOp0mAnqtfd6ow270Hktde2wFyZQ137-88oW7Hi_hE8XC65H9ubg2yzP_KxA__0l4X8QS7LobD8LPmStuF2AWiL4BULCtplbZtoSqxa-gdXaoNHLmoCyc_-D2qY")' }}
              ></div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-start justify-end p-2 opacity-0 group-hover:opacity-100">
                <button className="bg-white/90 p-1.5 rounded-full text-[#101418] hover:text-red-500 transition-colors shadow-sm backdrop-blur-sm">
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Add Photo Button */}
            <button className="aspect-square relative rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-primary dark:hover:border-primary bg-slate-50 dark:bg-slate-800/30 flex flex-col items-center justify-center gap-3 text-slate-500 transition-all hover:bg-primary/5 group cursor-pointer">
              <div className="bg-white dark:bg-slate-700 rounded-full p-3 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all">
                <Plus className="text-primary w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wide">Add Photo</span>
            </button>
          </div>
        </section>

        {/* Details Section */}
        <section className="xl:col-span-7 flex flex-col pb-12">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#101418] dark:text-white">Alex, 28</h1>
                <span className="flex items-center" title="Verified User">
                  <BadgeCheck className="w-8 h-8 text-white fill-primary" />
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-bold text-sm">
                <MapPin className="w-5 h-5" />
                <span>San Francisco, CA</span>
              </div>
            </div>
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-full border border-slate-200 dark:border-slate-700">
              <button className="px-5 py-2 rounded-full text-sm font-bold transition-all text-slate-500 dark:text-slate-400 hover:text-[#101418]">Preview</button>
              <button className="px-5 py-2 rounded-full bg-white dark:bg-slate-700 text-[#101418] dark:text-white shadow-sm text-sm font-bold ring-1 ring-black/5 dark:ring-white/10">Edit</button>
            </div>
          </div>

          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-[#101418] dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-primary" />
                  About Me
                </label>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">24/500</span>
              </div>
              <textarea
                className="w-full resize-none rounded-2xl border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a2733] text-[#101418] dark:text-white focus:border-primary focus:ring-primary min-h-[140px] p-5 text-base leading-relaxed placeholder:text-slate-400 shadow-sm transition-shadow focus:shadow-md"
                placeholder="Write a short bio about yourself..."
                defaultValue="Product Designer by day, amateur chef by night. I love exploring new cities and finding the best coffee spots."
              ></textarea>
            </div>

            <div className="space-y-8 p-6 rounded-3xl bg-slate-50 dark:bg-[#1a2733]/50 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-700/50">
                <BrainCircuit className="w-6 h-6 text-primary" />
                <h4 className="text-lg font-bold text-[#101418] dark:text-white">Profile Prompts</h4>
              </div>
              <div className="group relative space-y-3">
                <label className="block text-sm font-bold text-[#101418] dark:text-white">A fun fact about me is...</label>
                <div className="relative">
                  <textarea
                    className="w-full resize-none rounded-2xl border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a2733] text-[#101418] dark:text-white focus:border-primary focus:ring-primary min-h-[100px] p-4 pr-14 text-base leading-relaxed placeholder:text-slate-400 shadow-sm"
                    placeholder="Type your answer here..."
                    defaultValue="I once accidentally crashed a wedding and ended up giving a toast."
                  ></textarea>
                  <button className="absolute right-3 bottom-3 p-2 text-primary hover:bg-primary/10 rounded-xl transition-colors tooltip-trigger" title="Get AI Suggestion">
                    <Sparkles className="w-5 h-5 fill-current" />
                  </button>
                </div>
              </div>
              <div className="group relative space-y-3">
                <label className="block text-sm font-bold text-[#101418] dark:text-white">Two truths and a lie</label>
                <div className="relative">
                  <textarea
                    className="w-full resize-none rounded-2xl border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a2733] text-[#101418] dark:text-white focus:border-primary focus:ring-primary min-h-[100px] p-4 pr-14 text-base leading-relaxed placeholder:text-slate-400 shadow-sm"
                    placeholder="1. ...
2. ...
3. ..."
                  ></textarea>
                  <button className="absolute right-3 bottom-3 p-2 text-slate-500 hover:text-primary hover:bg-primary/10 rounded-xl transition-colors tooltip-trigger" title="Get AI Suggestion">
                    <Sparkles className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-[#101418] dark:text-white uppercase tracking-wider flex items-center gap-2">
                <div className="w-5 h-5 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary" />
                </div>
                Passions & Interests
              </label>
              <div className="flex flex-wrap gap-2.5">
                {["Hiking", "Sushi", "Indie Rock", "Travel"].map((interest) => (
                  <span key={interest} className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white dark:bg-[#1a2733] text-[#101418] dark:text-white text-sm font-bold border border-slate-200 dark:border-slate-700 shadow-sm cursor-default hover:border-primary/50 transition-colors group">
                    {interest}
                    <button className="group-hover:text-red-500 rounded-full p-0.5 transition-colors">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
                <button className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 text-primary text-sm font-bold border border-transparent transition-all">
                  <Plus className="w-5 h-5" />
                  Add Interest
                </button>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
              <button className="w-full sm:w-auto bg-primary hover:bg-blue-600 text-white px-10 py-3.5 rounded-full font-bold shadow-lg shadow-primary/30 transition-all transform active:scale-95 flex items-center justify-center gap-2">
                <Save className="w-5 h-5" />
                Save Changes
              </button>
              <div className="flex gap-6 text-sm font-bold">
                <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                  Block User
                </button>
                <button className="text-red-500 hover:text-red-600 transition-colors flex items-center gap-1">
                  <Flag className="w-5 h-5" />
                  Report
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="h-10"></div>
    </div>
  );
}
