export type BlogAuthorProps = {
  /**
   * The first name of the author.
   */
  firstName: string;

  /**
   * The last name of the author.
   */
  lastName: string;

  /**
   * The source URL for the author's image.
   * This field is optional and can be used to display the author's picture alongside the blog post.
   */
  imageUrl?: string;

  /**
   * Class name
   */
  className?: string;
};

export type BlogCardProps = {
  /**
   * The title of the blog post.
   * This is a required field and should be a concise representation of the blog content.
   */
  title: string;

  /**
   * A brief description of the blog post.
   * This field is optional and can be used to provide a short summary or introduction to the blog content.
   */
  description?: string;

  /**
   * Category associated with the blog post.
   */
  category?: string;

  /**
   * Information about the author of the blog post.
   */
  author: BlogAuthorProps;

  /**
   * The date when the blog post was published.
   * This should be in a string format that can be easily parsed or displayed.
   */
  publishedDate: string;

  /**
   * The estimated reading time for the blog post, in minutes.
   * This field is optional and can be used to inform readers about the time commitment required to read the post.
   */
  readTime?: number;

  /**
   * The source URL for the blog post's main image.
   * This field is optional and can be used to visually represent the blog content.
   */
  imageUrl?: string;
};
