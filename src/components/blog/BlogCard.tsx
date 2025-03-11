"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CtfImage } from "@/components/contentful";
import { AlarmClockIcon } from "lucide-react";
import BlogAuthor from "./BlogAuthor";
import {
  useContentfulLiveUpdates,
  useContentfulInspectorMode,
} from "@contentful/live-preview/react";
import Link from "next/link";
import BlogDate from "./BlogDate";
import { TypeBlogPost } from "@/lib/contentful/types";

interface BlogCardProps {
  blog: TypeBlogPost<"WITHOUT_UNRESOLVABLE_LINKS">;
}

function BlogCard({ blog }: BlogCardProps) {
  const { publishedDate, category, slug, title, description, readTime } =
    useContentfulLiveUpdates(blog.fields);
  const inspectorProps = useContentfulInspectorMode({
    entryId: blog.sys.id,
  });
  return (
    <Card as={Link} href={`/${slug}`} className="max-w-88 w-full">
      <CardHeader {...inspectorProps({ fieldId: "featuredImage" })}>
        <CtfImage
          className="rounded-xs"
          sizes="(max-width: 728px) 100vw, (max-width: 1024px) 50vw, 33vw"
          width={413}
          height={262}
          {...blog?.fields?.featuredImage?.fields}
        />
      </CardHeader>
      <CardContent className="pt-4">
        {category?.fields.title && (
          <Badge
            variant="secondary"
            {...inspectorProps({ fieldId: "category.fields.title" })}
          >
            {category?.fields.title}
          </Badge>
        )}
        <CardTitle className="mt-3" {...inspectorProps({ fieldId: "title" })}>
          {title}
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground/80 py-3">
          {blog?.fields?.author && (
            <BlogAuthor
              author={blog?.fields?.author}
              className="pr-2 border-r"
            />
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
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <div
          className="flex items-center justify-items-end text-xs text-muted-foreground/80"
          {...inspectorProps({ fieldId: "readTime" })}
        >
          <AlarmClockIcon className="text-primary" height={14} />
          <span>{readTime} Mins. to read</span>
        </div>
      </CardFooter>
    </Card>
  );
}

export default BlogCard;
