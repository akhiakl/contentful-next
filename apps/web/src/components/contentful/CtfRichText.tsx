import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";

export interface ContentfulRichTextInterface {
  document: Document;
}

export const CtfRichText = ({ document }: ContentfulRichTextInterface) => {
  return (
    <article className="prose prose-sm max-w-none">
      {documentToReactComponents(document)}
    </article>
  );
};
