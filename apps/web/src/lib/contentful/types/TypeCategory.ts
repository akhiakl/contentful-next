import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

/**
 * Fields type definition for content type 'TypeCategory'
 * @name TypeCategoryFields
 * @type {TypeCategoryFields}
 * @memberof TypeCategory
 */
export interface TypeCategoryFields {
  /**
   * Field type definition for field 'title' (Title)
   * @name Title
   * @localized true
   */
  title: EntryFieldTypes.Symbol;
}

/**
 * Entry skeleton type definition for content type 'category' (Category)
 * @name TypeCategorySkeleton
 * @type {TypeCategorySkeleton}
 * @author 2fXzZ9CnrdYg7TA2K9TfTb
 * @since 2025-03-11T08:02:37.410Z
 * @version 1
 */
export type TypeCategorySkeleton = EntrySkeletonType<
  TypeCategoryFields,
  "category"
>;
/**
 * Entry type definition for content type 'category' (Category)
 * @name TypeCategory
 * @type {TypeCategory}
 * @author Akhil K<akhil.k@publicissapient.com>
 * @since 2025-03-11T08:02:37.410Z
 * @version 1
 * @link https://app.contentful.com/spaces/c9skdxhufbf1/environments/stage/content_types/category
 */
export type TypeCategory<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode
> = Entry<TypeCategorySkeleton, Modifiers, Locales>;

export function isTypeCategory<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>
): entry is TypeCategory<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === "category";
}
