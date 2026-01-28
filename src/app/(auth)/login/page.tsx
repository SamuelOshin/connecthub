import { AuthLayout } from "@/components/features/auth/AuthLayout";
import { LoginForm } from "@/components/features/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ConnectHub - Login",
  description: "Log in to your account.",
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
