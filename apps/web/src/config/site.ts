export const siteConfig = {
  name: "Contentful Next",
  url: new URL(
    process.env.APP_BASE_URL ??
      `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` ??
      ""
  ),
  defaultLocale: "en-US",
  localePrefixes: {
    "en-US": "/en",
    "fr-CA": "/fr",
  },
  description:
    "A set of beautifully-designed, accessible components and a code distribution platform. Works with your favorite frameworks. Open Source. Open Code.",
};

export type SiteConfig = typeof siteConfig;
