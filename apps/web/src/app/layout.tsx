import { siteConfig } from "@/config/site";
import "@repo/ui/globals.css";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  alternates: {
    canonical: "/",
    languages: {
      ...siteConfig.localePrefixes,
      [siteConfig.defaultLocale]: "/",
    },
  },
};

export default async function RootLayout({ children }: LayoutProps) {
  return children;
}
