import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";
import type { TypeAuthorSkeleton } from "./TypeAuthor";
import type { TypeCategorySkeleton } from "./TypeCategory";

/**
 * Fields type definition for content type 'TypeBlogPost'
 * @name TypeBlogPostFields
 * @type {TypeBlogPostFields}
 * @memberof TypeBlogPost
 */
export interface TypeBlogPostFields {
  /**
   * Field type definition for field 'title' (Title)
   * @name Title
   * @localized true
   */
  title: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'description' (Short Description)
   * @name Short Description
   * @localized true
   */
  description?: EntryFieldTypes.Text;
  /**
   * Field type definition for field 'author' (Author)
   * @name Author
   * @localized false
   */
  author: EntryFieldTypes.EntryLink<TypeAuthorSkeleton>;
  /**
   * Field type definition for field 'readTime' (Read Time)
   * @name Read Time
   * @localized false
   */
  readTime?: EntryFieldTypes.Integer;
  /**
   * Field type definition for field 'category' (Category)
   * @name Category
   * @localized false
   */
  category?: EntryFieldTypes.EntryLink<TypeCategorySkeleton>;
  /**
   * Field type definition for field 'slug' (Slug)
   * @name Slug
   * @localized false
   */
  slug: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'featuredImage' (Featured Image)
   * @name Featured Image
   * @localized false
   */
  featuredImage: EntryFieldTypes.AssetLink;
  /**
   * Field type definition for field 'publishedDate' (Blog Published Date)
   * @name Blog Published Date
   * @localized false
   */
  publishedDate: EntryFieldTypes.Date;
  /**
   * Field type definition for field 'content' (Content)
   * @name Content
   * @localized true
   */
  content?: EntryFieldTypes.RichText;
  /**
   * Field type definition for field 'relatedBlogPosts' (Related Blog Posts)
   * @name Related Blog Posts
   * @localized false
   */
  relatedBlogPosts?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeBlogPostSkeleton>
  >;
  /**
   * Field type definition for field 'seoPageTitle' (SEO Page Title)
   * @name SEO Page Title
   * @localized true
   */
  seoPageTitle?: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'seoPageDescription' (SEO Page Description)
   * @name SEO Page Description
   * @localized true
   */
  seoPageDescription?: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'canonicalUrl' (Canonical Url)
   * @name Canonical Url
   * @localized false
   */
  canonicalUrl?: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'nofollow' (nofollow)
   * @name nofollow
   * @localized false
   */
  nofollow?: EntryFieldTypes.Boolean;
  /**
   * Field type definition for field 'noindex' (noindex)
   * @name noindex
   * @localized false
   */
  noindex?: EntryFieldTypes.Boolean;
}

/**
 * Entry skeleton type definition for content type 'blogPost' (Blog Post)
 * @name TypeBlogPostSkeleton
 * @type {TypeBlogPostSkeleton}
 * @author 2fXzZ9CnrdYg7TA2K9TfTb
 * @since 2025-03-11T08:02:38.493Z
 * @version 5
 */
export type TypeBlogPostSkeleton = EntrySkeletonType<
  TypeBlogPostFields,
  "blogPost"
>;
/**
 * Entry type definition for content type 'blogPost' (Blog Post)
 * @name TypeBlogPost
 * @type {TypeBlogPost}
 * @author Akhil K<akhil.k@publicissapient.com>
 * @since 2025-03-11T08:02:38.493Z
 * @version 5
 * @link https://app.contentful.com/spaces/c9skdxhufbf1/environments/stage/content_types/blogPost
 */
export type TypeBlogPost<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode
> = Entry<TypeBlogPostSkeleton, Modifiers, Locales>;

export function isTypeBlogPost<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>
): entry is TypeBlogPost<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === "blogPost";
}
