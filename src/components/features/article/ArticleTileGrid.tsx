import { HTMLProps } from "react";
import { clsx } from "clsx";

import { ArticleTile } from "@/components/features/article/ArticleTile";

interface ArticleTileGridProps extends HTMLProps<HTMLDivElement> {
  articles?: Array<any | null>;
}

export const ArticleTileGrid = ({
  articles,
  className,
  ...props
}: ArticleTileGridProps) => {
  return articles && articles.length > 0 ? (
    <div
      className={clsx(
        "grid grid-cols-1 gap-y-4 gap-x-5 md:grid-cols-3 lg:gap-x-12 lg:gap-y-12",
        className
      )}
      {...props}
    >
      {articles.map((article, index) => {
        return article ? <ArticleTile key={index} article={article} /> : null;
      })}
    </div>
  ) : null;
};
