import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { routing } from "@/i18n/routing";
import { ContentfulPreviewProvider } from "@/components/contentful";
import Header from "@/components/header";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
const allowedOriginList = [
  "https://app.contentful.com",
  "https://app.eu.contentful.com",
];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { isEnabled: preview } = await draftMode();

  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <ContentfulPreviewProvider
            locale={locale}
            enableInspectorMode={preview}
            enableLiveUpdates={preview}
            targetOrigin={allowedOriginList}
          >
            <main className="pt-24">{children}</main>
          </ContentfulPreviewProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
