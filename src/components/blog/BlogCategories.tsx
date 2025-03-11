import { getClient } from "@/lib/contentful/client";
import { TypeCategorySkeleton } from "@/lib/contentful/types";
import React from "react";

type BlogCategoriesProps = {
  isDraftModeEnabled?: boolean;
  locale?: string;
};

const BlogCategories = async ({
  isDraftModeEnabled,
  locale,
}: BlogCategoriesProps) => {
  const categories = await getClient(
    isDraftModeEnabled
  ).withoutUnresolvableLinks.getEntries<TypeCategorySkeleton>({
    content_type: "category",
    locale,
  });

  return (
    <div>
      <h3 className="mb-4">
        <span className="bg-primary text-secondary px-2">Categories</span>
      </h3>
      <ul>
        {categories?.items?.map((category) => (
          <li
            key={category?.sys?.id}
            className="py-4 border-b border-dashed border-secondary"
          >
            {category?.fields?.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogCategories;
