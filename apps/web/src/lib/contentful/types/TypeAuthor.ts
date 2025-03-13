import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

/**
 * Fields type definition for content type 'TypeAuthor'
 * @name TypeAuthorFields
 * @type {TypeAuthorFields}
 * @memberof TypeAuthor
 */
export interface TypeAuthorFields {
  /**
   * Field type definition for field 'name' (Name)
   * @name Name
   * @localized false
   */
  name: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'title' (Title)
   * @name Title
   * @localized true
   */
  title: EntryFieldTypes.Text;
  /**
   * Field type definition for field 'avatar' (Avatar)
   * @name Avatar
   * @localized false
   */
  avatar: EntryFieldTypes.AssetLink;
}

/**
 * Entry skeleton type definition for content type 'author' (Author)
 * @name TypeAuthorSkeleton
 * @type {TypeAuthorSkeleton}
 * @author 2fXzZ9CnrdYg7TA2K9TfTb
 * @since 2025-03-07T13:31:36.173Z
 * @version 9
 */
export type TypeAuthorSkeleton = EntrySkeletonType<TypeAuthorFields, "author">;
/**
 * Entry type definition for content type 'author' (Author)
 * @name TypeAuthor
 * @type {TypeAuthor}
 * @author Akhil K<akhil.k@publicissapient.com>
 * @since 2025-03-07T13:31:36.173Z
 * @version 9
 * @link https://app.contentful.com/spaces/c9skdxhufbf1/environments/stage/content_types/author
 */
export type TypeAuthor<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode
> = Entry<TypeAuthorSkeleton, Modifiers, Locales>;

export function isTypeAuthor<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>
): entry is TypeAuthor<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === "author";
}
