"use client";

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from "@contentful/live-preview/react";
import { clsx } from "clsx";

import { ArticleAuthor } from "@/components/features/article/ArticleAuthor";
import { ArticleLabel } from "@/components/features/article/ArticleLabel";
import { CtfImage } from "@/components/features/contentful";
import { useTranslations } from "next-intl";
import { FormatDate } from "@/components/format-date";

interface ArticleHeroProps {
  article: any;
  isFeatured?: boolean;
  isReversedLayout?: boolean;
  locale?: string;
}

export const ArticleHero = ({
  article,
  isFeatured,
  isReversedLayout = false,
}: ArticleHeroProps) => {
  const t = useTranslations();
  const inspectorProps = useContentfulInspectorMode({
    entryId: article.sys.id,
  });
  const { title, shortDescription, publishedDate } = useContentfulLiveUpdates(
    article.fields
  );
  console.log({ title, shortDescription, publishedDate });
  return (
    <div
      className={clsx(
        `flex flex-col overflow-hidden rounded-2xl border border-gray300 shadow-lg`,
        isReversedLayout ? "lg:flex-row-reverse" : "lg:flex-row"
      )}
    >
      <div
        className="flex-1 basis-1/2"
        {...inspectorProps({ fieldId: "featuredImage" })}
      >
        {article.fields.featuredImage && (
          <CtfImage
            nextImageProps={{
              className: "w-full",
              priority: true,
              sizes: undefined,
            }}
            {...article.fields.featuredImage}
          />
        )}
      </div>

      <div className="relative flex flex-1 basis-1/2 flex-col justify-center py-6 px-4 lg:px-16 lg:py-12 xl:px-24">
        <div className="mb-2 flex flex-wrap items-center">
          <ArticleAuthor article={article} />
          {isFeatured && (
            <ArticleLabel
              className={clsx(
                "ml-auto pl-2 lg:absolute lg:top-8 xl:top-12",
                isReversedLayout
                  ? "lg:left-6 xl:left-12"
                  : "lg:right-6 xl:right-12"
              )}
            >
              {t("article.fields.featured")}
            </ArticleLabel>
          )}
          <div
            className={clsx(
              "ml-auto hidden pl-2 text-xs text-gray600",
              isReversedLayout ? "lg:block" : ""
            )}
            {...inspectorProps({ fieldId: "publishedDate" })}
          >
            <FormatDate date={publishedDate} />
          </div>
        </div>
        <h1 {...inspectorProps({ fieldId: "title" })}>{title}</h1>
        {shortDescription && (
          <p
            className="mt-2"
            {...inspectorProps({ fieldId: "shortDescription" })}
          >
            {shortDescription}
          </p>
        )}
        <div
          className={clsx(
            "mt-2 text-xs text-gray600",
            isReversedLayout ? "lg:hidden" : ""
          )}
          {...inspectorProps({ fieldId: "publishedDate" })}
        >
          <FormatDate date={publishedDate} />
        </div>
      </div>
    </div>
  );
};
