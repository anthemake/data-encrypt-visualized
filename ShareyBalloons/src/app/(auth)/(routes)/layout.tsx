import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isAuthPage = typeof window !== "undefined" && window.location.pathname === "/sign-in";

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={isAuthPage ? "overflow-hidden" : "overflow-auto"}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
