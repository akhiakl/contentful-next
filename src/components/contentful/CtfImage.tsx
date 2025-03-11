import NextImage, { ImageProps as NextImageProps } from "next/image";
import { clsx } from "clsx";
import { AssetFields } from "contentful";

type ImageProps = AssetFields & Omit<NextImageProps, "src" | "alt">;

export const CtfImage = ({
  file,
  width,
  height,
  title,
  ...nextImageProps
}: ImageProps) => {
  if (!file?.url) return null;
  const imageUrl = file?.url.startsWith("//")
    ? `https:${file?.url}`
    : file?.url;

  const [path, queryString] = imageUrl.split("?");
  const searchParams = new URLSearchParams(queryString || "");

  searchParams.set("w", "10");

  const blurURL = `${path}?${searchParams.toString()}`;

  return (
    <NextImage
      src={imageUrl}
      width={width ?? file?.details?.image?.width}
      height={height ?? file?.details?.image?.height}
      alt={title || ""}
      sizes="(max-width: 1200px) 100vw, 50vw"
      placeholder="blur"
      blurDataURL={blurURL.toString()}
      {...nextImageProps}
      className={clsx(nextImageProps?.className, "transition-all")}
    />
  );
};
