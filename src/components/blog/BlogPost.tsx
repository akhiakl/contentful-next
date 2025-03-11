import React from "react";
import BlogContent from "./BlogContent";
import { Icons } from "@/components/icons";
import { LinkIcon } from "lucide-react";
import { TypeBlogPost } from "@/lib/contentful/types";

type Props = {
  blog: TypeBlogPost<"WITHOUT_UNRESOLVABLE_LINKS">;
};

const BlogPost = ({ blog }: Props) => {
  return (
    <>
      <BlogContent blog={blog} />
      <div className="flex items-center gap-3">
        <hr className="w-full" />
        <div className="flex grow gap-2">
          <LinkIcon />
          <Icons.facebook />
        </div>
        <hr className="w-full" />
      </div>
    </>
  );
};

export default BlogPost;
