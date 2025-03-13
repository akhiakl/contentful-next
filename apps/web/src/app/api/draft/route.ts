import { cookies, draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

interface ParsedRequestUrl {
  origin: string;
  host: string;
  slug: string;
  locale: string;
  contentfulPreviewSecret: string;
}

const parseRequestUrl = (requestUrl: string | undefined): ParsedRequestUrl => {
  if (!requestUrl) throw new Error("missing `url` value in request");
  const { searchParams, origin, host } = new URL(requestUrl);

  const slug = searchParams.get("slug") || "";
  const locale = searchParams.get("locale") || "";
  const contentfulPreviewSecret = searchParams.get("secret") || "";

  return { origin, slug, host, locale, contentfulPreviewSecret };
};

const buildRedirectUrl = ({
  slug,
  base,
  locale,
}: {
  slug: string;
  locale?: string;
  base: string;
}): string => {
  const redirectUrl = new URL(`${locale || "en"}/${slug}`, base);
  return redirectUrl.toString();
};

async function enableDraftMode() {
  const draft = await draftMode();
  draft.enable();
  const cookieStore = await cookies();
  const cookie = cookieStore.get("__prerender_bypass")!;
  cookieStore.set({
    name: "__prerender_bypass",
    value: cookie?.value,
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "none",
  });
}

export async function GET(request: NextRequest): Promise<Response | void> {
  const {
    origin: base,
    slug,
    locale,
    contentfulPreviewSecret: contentfulPreviewSecretFromQuery,
  } = parseRequestUrl(request.url);
  // if we're in development, we don't need to check, we can just enable draft mode
  if (process.env.NODE_ENV === "development") {
    await enableDraftMode();
    const redirectUrl = buildRedirectUrl({ slug, base, locale });
    return redirect(redirectUrl);
  }
  //value against the CONTENTFUL_PREVIEW_SECRET
  // env var, which is supported as a workaround for these accounts
  if (
    contentfulPreviewSecretFromQuery !== process.env.CONTENTFUL_PREVIEW_SECRET
  ) {
    return new Response(
      "The bypass token you are authorized with does not match the bypass secret for this deployment. You might need to redeploy or go back and try the link again.",
      { status: 403 }
    );
  }

  if (!slug) {
    return new Response("Missing required value for query parameter `path`", {
      status: 400,
    });
  }

  await enableDraftMode();

  const redirectUrl = buildRedirectUrl({ slug, base, locale });
  redirect(redirectUrl);
}
