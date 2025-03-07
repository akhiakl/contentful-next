"use client";

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from "@contentful/live-preview/react";

import { CtfImage } from "@/components/features/contentful";

interface ArticleAuthorProps {
  article: any;
}

export const ArticleAuthor = ({ article }: ArticleAuthorProps) => {
  const { author } = useContentfulLiveUpdates(article);
  const inspectorProps = useContentfulInspectorMode({
    entryId: author?.sys.id,
  });

  return (
    <div className="flex items-center">
      <div
        className="mr-2 overflow-hidden rounded-full border border-blue500"
        {...inspectorProps({ fieldId: "avatar" })}
      >
        {author?.avatar && (
          <CtfImage
            nextImageProps={{
              width: 28,
              height: 28,
              sizes: undefined,
              placeholder: undefined,
            }}
            {...author.avatar}
          />
        )}
      </div>
      <span
        className="text-xs leading-none text-gray600"
        {...inspectorProps({ fieldId: "name" })}
      >
        {author?.name}
      </span>
    </div>
  );
};
