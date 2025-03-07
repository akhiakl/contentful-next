import { createClient } from "contentful";

const clientDelivery = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT!,
});

export const clientPreview = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN!,
  host: "preview.contentful.com",
  environment: process.env.CONTENTFUL_ENVIRONMENT!,
});

export function getClient(draftMode = false) {
  return draftMode ? clientPreview : clientDelivery;
}
