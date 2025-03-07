"use client";

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from "@contentful/live-preview/react";
import Link from "next/link";
import { HTMLProps } from "react";
import { clsx } from "clsx";

import { ArticleAuthor } from "@/components/features/article/ArticleAuthor";
import { CtfImage } from "@/components/features/contentful";
import { FormatDate } from "@/components/format-date";

interface ArticleTileProps extends HTMLProps<HTMLDivElement> {
  article: any;
}

export const ArticleTile = ({ article, className }: ArticleTileProps) => {
  const { featuredImage, publishedDate, slug, title } =
    useContentfulLiveUpdates(article);
  const inspectorProps = useContentfulInspectorMode({
    entryId: article.sys.id,
  });

  return (
    <Link className="flex flex-col" href={`/${slug}`}>
      <div
        className={clsx(
          "flex flex-1 flex-col overflow-hidden rounded-2xl border border-gray300 shadow-lg",
          className
        )}
      >
        {featuredImage && (
          <div {...inspectorProps({ fieldId: "featuredImage" })}>
            <CtfImage
              nextImageProps={{
                className: "object-cover aspect-[16/10] w-full",
              }}
              {...featuredImage}
            />
          </div>
        )}
        <div className="flex flex-1 flex-col py-3 px-4 md:px-5 md:py-4 lg:px-7 lg:py-5">
          {title && (
            <p
              className="h3 mb-2 text-gray800 md:mb-3"
              {...inspectorProps({ fieldId: "title" })}
            >
              {title}
            </p>
          )}

          <div className="mt-auto flex items-center">
            <ArticleAuthor article={article} />
            <div
              className={clsx("ml-auto pl-2 text-xs text-gray600")}
              {...inspectorProps({ fieldId: "publishedDate" })}
            >
              <FormatDate date={publishedDate} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
