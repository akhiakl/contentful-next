import { siteConfig } from "@/config/site";
import "@repo/ui/globals.css";
import { languages } from "./shared-metadata";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  alternates: {
    canonical: "/",
    languages,
  },
};

export default async function RootLayout({ children }: LayoutProps) {
  return children;
}
