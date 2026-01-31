import Link from "next/link";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SocialButton } from "@/components/ui/social-button";
import { Mail, Lock, Eye, ArrowRight, Activity } from "lucide-react";

const MOCK_DATA = {
  header: {
    title: "ConnectHub",
  },
  pageTitle: "Welcome Back",
  pageSubtitle: "Please enter your details to sign in.",
  form: {
    emailLabel: "Email",
    emailPlaceholder: "Enter your email",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",
    forgotPassword: "Forgot Password?",
    submitButton: "Sign In"
  },
  social: {
    text: "Or continue with"
  },
  footer: {
    text: "Don't have an account yet?",
    linkText: "Sign Up",
    linkHref: "/sign-up"
  }
};

export default function LoginPage() {
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


      {/* Form */}
      <form className="flex flex-col gap-4">
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
        </div>

        <div className="flex justify-end">
            <Link href="#" className="text-primary text-sm font-semibold hover:underline">
                {MOCK_DATA.form.forgotPassword}
            </Link>
        </div>

        <Button className="w-full gap-2 text-base" size="lg">
            <span>{MOCK_DATA.form.submitButton}</span>
            <ArrowRight className="w-5 h-5" />
        </Button>
      </form>

      {/* Divider */}
      <div className="relative flex py-2 items-center">
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
      <div className="mt-4 text-center">
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
