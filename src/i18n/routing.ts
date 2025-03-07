import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en-US", "fr-CA"],
  defaultLocale: "en-US",
  localeCookie: false,
  localePrefix: {
    mode: "as-needed",
    prefixes: {
      "en-US": "/en",
      "fr-CA": "/fr",
    },
  },
});
