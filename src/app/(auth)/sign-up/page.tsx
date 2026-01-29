import Link from "next/link";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SocialButton } from "@/components/ui/social-button";
import { User, Mail, Lock, Eye, ArrowRight, Activity } from "lucide-react";

const MOCK_DATA = {
  header: {
    title: "ConnectHub",
    logoIcon: Activity // Using Activity as placeholder for 'hub' icon if needed, or stick to simple logic
  },
  pageTitle: "Create Account",
  pageSubtitle: "Start your journey to finding love today.",
  tabs: {
    login: "Log In",
    signup: "Sign Up"
  },
  form: {
    nameLabel: "Full Name",
    namePlaceholder: "Enter your full name",
    emailLabel: "Email or Phone",
    emailPlaceholder: "Enter your email",
    passwordLabel: "Create Password",
    passwordPlaceholder: "Create a strong password",
    strengthText: "Strength:",
    strengthValue: "Medium",
    terms: "I agree to the Terms of Service and Privacy Policy.",
    submitButton: "Sign Up"
  },
  social: {
    text: "Or sign up with"
  },
  footer: {
    text: "Already have an account?",
    linkText: "Log in",
    linkHref: "/login"
  }
};

export default function SignUpPage() {
  return (
    <AuthLayout>
      {/* Brand Header */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white">
          <Activity className="w-5 h-5" />
        </div>
        <h3 className="text-[#111418] dark:text-white tracking-tight text-xl font-bold">
          {MOCK_DATA.header.title}
        </h3>
      </div>

      {/* Page Title */}
      <div className="flex flex-col gap-2">
        <h1 className="text-[#111418] dark:text-white text-3xl font-extrabold leading-tight tracking-[-0.02em]">
          {MOCK_DATA.pageTitle}
        </h1>
        <p className="text-[#60758a] dark:text-gray-400 text-base font-normal">
          {MOCK_DATA.pageSubtitle}
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#dbe0e6] dark:border-gray-700 w-full mb-2">
        <div className="flex gap-8">
          <Link
            href="/login"
            className="flex items-center justify-center border-b-[3px] border-transparent text-[#60758a] dark:text-gray-500 hover:text-[#111418] dark:hover:text-gray-300 pb-3 pt-2 cursor-pointer transition-colors"
          >
            <span className="text-sm font-bold leading-normal tracking-[0.015em]">
              {MOCK_DATA.tabs.login}
            </span>
          </Link>
          <div className="flex items-center justify-center border-b-[3px] border-primary text-[#111418] dark:text-white pb-3 pt-2 cursor-pointer transition-colors">
            <span className="text-sm font-bold leading-normal tracking-[0.015em]">
              {MOCK_DATA.tabs.signup}
            </span>
          </div>
        </div>
      </div>

      {/* Form */}
      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-[#111418] dark:text-white text-sm font-medium leading-normal">
            {MOCK_DATA.form.nameLabel}
          </label>
          <Input
            type="text"
            placeholder={MOCK_DATA.form.namePlaceholder}
            leftIcon={<User className="w-5 h-5" />}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[#111418] dark:text-white text-sm font-medium leading-normal">
            {MOCK_DATA.form.emailLabel}
          </label>
          <Input
            type="email"
            placeholder={MOCK_DATA.form.emailPlaceholder}
            leftIcon={<Mail className="w-5 h-5" />}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[#111418] dark:text-white text-sm font-medium leading-normal">
            {MOCK_DATA.form.passwordLabel}
          </label>
          <div className="relative">
             <Input
                type="password"
                placeholder={MOCK_DATA.form.passwordPlaceholder}
                leftIcon={<Lock className="w-5 h-5" />}
             />
             <button
                type="button"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#60758a] dark:text-gray-500 hover:text-[#111418] dark:hover:text-white transition-colors"
             >
                <Eye className="w-5 h-5" />
             </button>
          </div>

          {/* Strength Meter */}
          <div className="flex flex-col gap-1 mt-1">
            <div className="flex gap-2 h-1.5 w-full">
              <div className="flex-1 rounded-full bg-yellow-500"></div>
              <div className="flex-1 rounded-full bg-yellow-500"></div>
              <div className="flex-1 rounded-full bg-[#e5e7eb] dark:bg-gray-700"></div>
              <div className="flex-1 rounded-full bg-[#e5e7eb] dark:bg-gray-700"></div>
            </div>
            <p className="text-xs text-[#60758a] dark:text-gray-500">
              {MOCK_DATA.form.strengthText}{" "}
              <span className="text-yellow-600 dark:text-yellow-500 font-medium">
                {MOCK_DATA.form.strengthValue}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 py-1">
            <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary bg-white dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
                />
            </div>
            <label htmlFor="terms" className="text-sm text-[#60758a] dark:text-gray-400 leading-tight select-none">
               I agree to the <Link href="#" className="text-[#111418] dark:text-white font-medium hover:underline">Terms of Service</Link> and <Link href="#" className="text-[#111418] dark:text-white font-medium hover:underline">Privacy Policy</Link>.
            </label>
        </div>

        <Button className="w-full gap-2 text-base" size="lg">
            <span>{MOCK_DATA.form.submitButton}</span>
            <ArrowRight className="w-5 h-5" />
        </Button>
      </form>

      {/* Divider */}
      <div className="relative flex py-1 items-center">
        <div className="flex-grow border-t border-[#dbe0e6] dark:border-gray-700"></div>
        <span className="flex-shrink-0 mx-4 text-[#60758a] dark:text-gray-500 text-sm font-medium">
          {MOCK_DATA.social.text}
        </span>
        <div className="flex-grow border-t border-[#dbe0e6] dark:border-gray-700"></div>
      </div>

      {/* Social Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <SocialButton provider="google" />
        <SocialButton provider="apple" />
      </div>

      {/* Footer */}
      <div className="text-center">
        <p className="text-xs text-[#60758a] dark:text-gray-500">
          {MOCK_DATA.footer.text}{" "}
          <Link href={MOCK_DATA.footer.linkHref} className="text-primary font-bold hover:underline">
            {MOCK_DATA.footer.linkText}
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
