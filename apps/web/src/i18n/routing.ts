import { defineRouting } from "next-intl/routing";
import { siteConfig } from "@/config/site";

export const routing = defineRouting({
  locales: Object.keys(siteConfig.localePrefixes),
  defaultLocale: siteConfig.defaultLocale,
  localeCookie: false,
  localePrefix: {
    mode: "as-needed",
    prefixes: siteConfig.localePrefixes,
  },
});
