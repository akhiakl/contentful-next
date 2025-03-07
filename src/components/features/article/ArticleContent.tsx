"use client";

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from "@contentful/live-preview/react";

import { CtfRichText } from "@/components/features/contentful";
import { useEffect } from "react";

interface ArticleContentProps {
  article: any;
}
export const ArticleContent = ({ article }: ArticleContentProps) => {
  const data = useContentfulLiveUpdates(article.fields);
  useEffect(() => {
    console.log({ data });
  }, [data]);
  const inspectorProps = useContentfulInspectorMode({
    entryId: article.sys.id,
  });

  return (
    <div {...inspectorProps({ fieldId: "content" })}>
      <CtfRichText json={data.content} links={data.content?.links} />
    </div>
  );
};
