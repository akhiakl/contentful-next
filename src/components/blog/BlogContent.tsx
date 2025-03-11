"use client";

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from "@contentful/live-preview/react";

import { CtfRichText } from "@/components/contentful";
import { TypeBlogPost } from "@/lib/contentful/types";

interface BlogContentProps {
  blog: TypeBlogPost<"WITHOUT_UNRESOLVABLE_LINKS">;
}

function BlogContent({ blog }: BlogContentProps) {
  const data = useContentfulLiveUpdates(blog?.fields);
  const inspectorProps = useContentfulInspectorMode({
    entryId: blog?.sys.id,
  });

  if (!data?.content) return null;

  return (
    <div {...inspectorProps({ fieldId: "content" })}>
      <CtfRichText document={data.content} />
    </div>
  );
}

export default BlogContent;
