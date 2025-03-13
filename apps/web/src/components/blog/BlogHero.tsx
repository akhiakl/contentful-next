"use client";

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from "@contentful/live-preview/react";
import { CtfImage } from "@/components/contentful";
import { TypeBlogPost } from "@/lib/contentful/types";
import BlogAuthor from "./BlogAuthor";
import { Badge } from "@/components/ui/badge";
import BlogDate from "./BlogDate";

interface BlogHeroProps {
  blog: TypeBlogPost<"WITHOUT_UNRESOLVABLE_LINKS">;
  locale?: string;
}

const BlogHero = ({ blog }: BlogHeroProps) => {
  const inspectorProps = useContentfulInspectorMode({
    entryId: blog.sys.id,
  });
  const { title, category, publishedDate } = useContentfulLiveUpdates(
    blog.fields
  );
  return (
    <div className="flex flex-col overflow-hidden pb-8">
      {category?.fields?.title && (
        <Badge
          variant="secondary"
          className="mb-3"
          {...inspectorProps({ fieldId: "category.fields.title" })}
        >
          {category?.fields?.title}
        </Badge>
      )}
      <h1 className="mb-4" {...inspectorProps({ fieldId: "title" })}>
        {title}
      </h1>
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground/80">
        {blog?.fields?.author && (
          <BlogAuthor author={blog?.fields?.author} className="pr-2 border-r" />
        )}
        {publishedDate && (
          <div
            className="flex items-center"
            {...inspectorProps({ fieldId: "publishedDate" })}
          >
            <BlogDate date={publishedDate} />
          </div>
        )}
      </div>
      <div
        className="flex-1 basis-1/2"
        {...inspectorProps({ fieldId: "featuredImage" })}
      >
        {blog.fields.featuredImage && (
          <CtfImage
            className="w-full"
            priority={true}
            sizes="(max-width: 1024px) 100vw, 33vw"
            {...blog?.fields?.featuredImage?.fields}
          />
        )}
      </div>
    </div>
  );
};

export default BlogHero;
