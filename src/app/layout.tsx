import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppShell } from "@/components/dashboard/AppShell";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Nexora — Votre espace financier",
  description: "Un tableau de bord clair et sécurisé pour piloter vos finances.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} antialiased min-[1000px]:h-screen min-[1000px]:overflow-hidden`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
