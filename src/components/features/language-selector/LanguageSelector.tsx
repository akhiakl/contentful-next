"use client";

import { usePathname, useRouter } from "next/navigation";
import { SyntheticEvent } from "react";
import { routing } from "@/i18n/routing";
import { useLocale } from "next-intl";

const localeName = (locale: string) => locale.split("-")[0];

const displayName = (locale: string) =>
  new Intl.DisplayNames([locale], {
    type: "language",
  });

const isChangeEvent = (
  event: SyntheticEvent
): event is React.ChangeEvent<HTMLSelectElement> => {
  return event.type === "change";
};

export const LanguageSelector = () => {
  const currentLocale = useLocale();
  const router = useRouter();
  const currentPathname = usePathname();

  const handleLocaleChange: React.EventHandler<React.SyntheticEvent> = (e) => {
    let newLocale: string | undefined = undefined;

    if (isChangeEvent(e)) {
      newLocale = e.target.value;
    }

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`;

    // redirect to the new locale path
    if (currentLocale === routing.defaultLocale) {
      router.push("/" + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  return routing.locales.length > 1 ? (
    <>
      <div>
        <select
          name="locale_selector"
          id="locale_selector"
          onChange={handleLocaleChange}
          value={currentLocale}
        >
          {routing.locales.map((locale) => (
            <option key={locale} value={locale}>
              {`${displayName(localeName(locale))}`}
            </option>
          ))}
        </select>
      </div>
    </>
  ) : null;
};
