import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { ArticleContent, ArticleHero } from "@/components/features/article";
import { getLocale, getTranslations } from "next-intl/server";
import { getClient } from "@/lib/contentful/client";

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const { isEnabled: preview } = await draftMode();
  const pageBlogPostCollection = await getClient(preview).getEntries({
    content_type: "blogPostPage",
    "fields.slug": slug,
    limit: 1,
    locale,
  });
  const blogPost = pageBlogPostCollection?.items[0];

  const metadata: Metadata = {
    alternates: {
      canonical: slug,
    },
  };

  if (blogPost?.fields) {
    metadata.title = (blogPost?.fields.seoPageTitle ??
      blogPost?.fields.title) as string;
    metadata.description = (blogPost?.fields.seoPageDescription ??
      blogPost?.fields.shortDescription) as string;
    metadata.robots = {
      follow: !blogPost?.fields.nofollow,
      index: !blogPost?.fields.noindex,
    };
  }

  return metadata;
}

// export async function generateStaticParams({
//   params,
// }: {
//   params: { locale: string };
// }): Promise<BlogPageProps["params"][]> {
//   const { locale } = await params;
//   const pageBlogPostCollection = await getClient(false).getEntries({
//     content_type: "blogPostPage",
//     limit: 100,
//     locale,
//   });

//   if (!pageBlogPostCollection?.items) {
//     throw new Error("No blog posts found");
//   }

//   return pageBlogPostCollection.items
//     .filter((blogPost): blogPost is NonNullable<typeof blogPost> =>
//       Boolean(blogPost?.fields.slug)
//     )
//     .map((blogPost) => {
//       return {
//         locale,
//         slug: blogPost?.fields.slug as string,
//       };
//     });
// }

interface BlogPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export default async function Page({ params }: BlogPageProps) {
  const { slug } = await params;
  const { isEnabled: preview } = await draftMode();
  const t = await getTranslations();
  const locale = await getLocale();
  const pageBlogPostCollection = await getClient(preview).getEntries({
    content_type: "blogPostPage",
    "fields.slug": slug,
    limit: 1,
    locale,
  });

  const blogPost = pageBlogPostCollection?.items[0];

  if (!blogPost) {
    notFound();
  }

  return (
    <>
      <div>
        <ArticleHero article={blogPost} isReversedLayout={true} />
      </div>
      <div className="mt-8 max-w-4xl">
        <ArticleContent article={blogPost} />
      </div>
    </>
  );
}
