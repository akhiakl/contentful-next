import { siteConfig } from "@/config/site";

export const languages = {
  ...siteConfig.localePrefixes,
  [siteConfig.defaultLocale]: "/",
};

export const getLocalePrefixes = (slug: string) =>
  Object.fromEntries(
    Object.entries(languages).map(([key, value]) => [key, `/${slug}${value}`])
  );
