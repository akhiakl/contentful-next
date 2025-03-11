import { getClient } from "@/lib/contentful/client";
import { TypeAuthorSkeleton } from "@/lib/contentful/types";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  isDraftModeEnabled?: boolean;
  locale?: string;
};

const BlogTopAuthors = async ({ isDraftModeEnabled, locale }: Props) => {
  const topAuthors = await getClient(
    isDraftModeEnabled
  ).withoutUnresolvableLinks.getEntries<TypeAuthorSkeleton>({
    content_type: "author",
    limit: 3,
    locale,
  });
  return (
    <div className="flex flex-col gap-4">
      <h3>
        <span className="bg-primary text-secondary px-2">Top</span> Authors
      </h3>
      {topAuthors?.items?.map((author) => (
        <div key={author?.sys.id} className="flex gap-4 items-center">
          <Avatar title={author?.fields?.name} className="size-20">
            <AvatarImage
              src={author?.fields?.avatar?.fields?.file?.url}
              alt={author?.fields?.name}
            />
            <AvatarFallback className="uppercase">
              {`${author?.fields?.name?.match(/\b(\w)/g)?.join("")}`}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="capitalize font-bold">{author?.fields?.name}</div>
            <div className="text-sm text-muted-foreground">
              {author.fields.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogTopAuthors;
