"use client";

import * as React from "react";
import { Avatar } from "@/components/avatar";
import { cn } from "@repo/ui/lib/utils";
import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from "@contentful/live-preview/react";
import { TypeAuthor } from "@/lib/contentful/types";

interface BlogAuthorProps {
  author: TypeAuthor<"WITHOUT_UNRESOLVABLE_LINKS">;
  className?: string;
}

const BlogAuthor = ({ author, className }: BlogAuthorProps) => {
  const inspectorProps = useContentfulInspectorMode({
    entryId: author?.sys.id,
  });
  const { name, avatar } = useContentfulLiveUpdates(author.fields);
  return (
    <div className={cn("flex items-center gap-2 border-r", className)}>
      <Avatar
        title={name}
        src={avatar?.fields?.file?.url}
        alt={name}
        className="size-8"
        size={32}
        fallbackClassName="uppercase"
        {...inspectorProps({ fieldId: "avatar" })}
      >
        {`${name?.match(/\b(\w)/g)?.join("")}`}
      </Avatar>
      <span className="capitalize" {...inspectorProps({ fieldId: "name" })}>
        {name}
      </span>
    </div>
  );
};

export default BlogAuthor;
