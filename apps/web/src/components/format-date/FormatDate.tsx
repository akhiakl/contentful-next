"use client";

import { useLocale } from "next-intl";

interface FormatDateProps {
  date: Date | string;
  locale?: string;
  formatOptions?: Intl.DateTimeFormatOptions;
}

/**
 * A unified function that either uses a custom formatString or falls back to a default date style.
 * It uses "en-US" as the default locale if none is provided.
 */
export const formatDateFunc = ({
  date,
  locale,
  formatOptions,
}: FormatDateProps) => {
  // Use the provided locale or fallback to default
  const computedLocale = locale || "en-US";

  return new Intl.DateTimeFormat(
    computedLocale,
    formatOptions ?? {
      dateStyle: "long",
    }
  ).format(new Date(date));
};

/**
 * A React component that gets the locale from next-intl (with a default fallback)
 * and formats the date accordingly.
 */
export const FormatDate = (props: FormatDateProps) => {
  // Use next-intl's locale and fall back to "en-US" if not available.
  const nextIntlLocale = useLocale() || "en-US";

  if (!props?.date) return null;

  return (
    <>{formatDateFunc({ ...props, locale: props.locale || nextIntlLocale })}</>
  );
};
