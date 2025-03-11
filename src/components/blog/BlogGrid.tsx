import * as React from "react";
import { TypeBlogPost } from "@/lib/contentful/types";
import BlogCard from "./BlogCard";

interface BlogGridProps {
  blogs: (TypeBlogPost<"WITHOUT_UNRESOLVABLE_LINKS"> | undefined)[];
}

const BlogGrid = ({ blogs }: BlogGridProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 auto-cols-auto gap-4 justify-between">
      {[...blogs, ...blogs]?.filter(Boolean).map((blog) => (
        <BlogCard key={blog?.sys?.id} blog={blog!} />
      ))}
    </div>
  );
};

export default BlogGrid;
