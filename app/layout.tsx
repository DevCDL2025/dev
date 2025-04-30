import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const poppins = Poppins({
  weight: ["100", "300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "MediConnect",
  description: "Système efficace de gestion des rendez-vous médicaux",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className}  antialiased`}>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
