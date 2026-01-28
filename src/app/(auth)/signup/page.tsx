import { AuthLayout } from "@/components/features/auth/AuthLayout";
import { SignUpForm } from "@/components/features/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ConnectHub - Sign Up",
  description: "Create your account to start finding connections.",
};

export default function SignUpPage() {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
}
