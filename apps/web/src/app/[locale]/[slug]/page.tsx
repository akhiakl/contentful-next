import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { getLocale } from "next-intl/server";
import { getClient } from "@/lib/contentful/client";
import BlogPost from "@/components/blog/BlogPost";
import { TypeBlogPostSkeleton } from "@/lib/contentful/types";
import BlogHero from "@/components/blog/BlogHero";
import BlogGrid from "@/components/blog/BlogGrid";
import { Suspense } from "react";
import BlogTopAuthors from "@/components/blog/BlogTopAuthors";
import BlogCategories from "@/components/blog/BlogCategories";
import { QnA, Summarizer } from "@repo/ai-companion/server";
import { getLocalePrefixes } from "@/app/shared-metadata";
import { siteConfig } from "@/config/site";

interface BlogPageParams {
  locale: string;
  slug: string;
}
interface BlogPageProps {
  params: Promise<BlogPageParams>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const { isEnabled: preview } = await draftMode();
  const pageBlogPostCollection = await getClient(
    preview
  ).getEntries<TypeBlogPostSkeleton>({
    content_type: "blogPost",
    "fields.slug": slug,
    limit: 1,
    locale,
  });
  const blogPost = pageBlogPostCollection?.items[0];

  const metadata: Metadata = {
    alternates: {
      canonical: `/${slug}`,
      languages: getLocalePrefixes(slug),
    },
  };

  if (blogPost?.fields) {
    metadata.title = (blogPost?.fields.seoPageTitle ??
      blogPost?.fields.title) as string;
    metadata.description = (blogPost?.fields.seoPageDescription ??
      blogPost?.fields.description) as string;
    metadata.robots = {
      follow: !blogPost?.fields.nofollow,
      index: !blogPost?.fields.noindex,
    };
  }

  return metadata;
}

export async function generateStaticParams(): Promise<BlogPageParams[]> {
  const blogPostCollection = await getClient(false).getEntries({
    content_type: "blogPost",
    limit: 100,
    locale: siteConfig.defaultLocale,
    select: ["fields.slug"],
  });

  if (!blogPostCollection?.items) {
    throw new Error("No blog posts found");
  }

  return blogPostCollection.items
    .filter((blogPost): blogPost is NonNullable<typeof blogPost> =>
      Boolean(blogPost?.fields.slug)
    )
    .map((blogPost) => ({
      locale: siteConfig.defaultLocale,
      slug: blogPost.fields.slug as string,
    }));
}

export default async function Page({ params }: BlogPageProps) {
  const { slug } = await params;
  const { isEnabled: preview } = await draftMode();
  const locale = await getLocale();
  const pageBlogPostCollection = await getClient(
    preview
  ).withoutUnresolvableLinks.getEntries<TypeBlogPostSkeleton>({
    content_type: "blogPost",
    "fields.slug": slug,
    limit: 1,
    locale,
  });

  const blogPost = pageBlogPostCollection?.items[0];

  if (!blogPost) {
    notFound();
  }

  return (
    <div className="px-4 md:px-6 mx-auto">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <BlogHero blog={blogPost} />
          <div>
            <BlogPost blog={blogPost} />
            <section>
              <h2 className="text-2xl font-semibold mb-4">Summarize Content</h2>
              <Summarizer
                context={`Did you come here for something in particular or just general Riker-bashing? And blowing into maximum warp speed, you appeared for an instant to be in two places at once. We have a saboteur aboard. We know you’re dealing in stolen ore. But I wanna talk about the assassination attempt on Lieutenant Worf. Could someone survive inside a transporter buffer for 75 years? Fate. It protects fools, little children, and ships.

I Created a Developer Rap Video - Here's What I Learned
Did you come here for something in particular or just general Riker-bashing? And blowing into maximum warp speed, you appeared for an instant to be in two places at once. We have a saboteur aboard. We know you’re dealing in stolen ore. But I wanna talk about the assassination attempt`}
              />
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-4">Ask a Question</h2>
              <QnA
                context={`Did you come here for something in particular or just general Riker-bashing? And blowing into maximum warp speed, you appeared for an instant to be in two places at once. We have a saboteur aboard. We know you’re dealing in stolen ore. But I wanna talk about the assassination attempt on Lieutenant Worf. Could someone survive inside a transporter buffer for 75 years? Fate. It protects fools, little children, and ships.

I Created a Developer Rap Video - Here's What I Learned
Did you come here for something in particular or just general Riker-bashing? And blowing into maximum warp speed, you appeared for an instant to be in two places at once. We have a saboteur aboard. We know you’re dealing in stolen ore. But I wanna talk about the assassination attempt`}
              />
            </section>
            <div className="py-4">
              <h2 className="mb-10">
                <span className="bg-primary text-secondary px-2">
                  See related
                </span>{" "}
                posts
              </h2>
              {blogPost.fields.relatedBlogPosts && (
                <BlogGrid blogs={blogPost.fields.relatedBlogPosts} />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 md:gap-12 px-3">
          <Suspense fallback={<div>Loading...</div>}>
            <BlogTopAuthors isDraftModeEnabled={preview} />
          </Suspense>
          <div className="h-80 bg-primary text-secondary">
            <sub>Ad</sub>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <BlogCategories isDraftModeEnabled={preview} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
