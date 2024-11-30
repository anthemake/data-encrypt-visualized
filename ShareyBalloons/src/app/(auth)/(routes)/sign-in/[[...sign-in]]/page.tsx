// app/(auth)/sign-in/page.tsx or src/app/sign-in/page.tsx (depending on structure)
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      <SignIn fallbackRedirectUrl="/dashboard" />
    </div>
  );
}
