import NextImage, { ImageProps as NextImageProps } from "next/image";
import { clsx } from "clsx";

interface ImageProps extends Omit<any, "__typename"> {
  nextImageProps?: Omit<NextImageProps, "src" | "alt">;
}

export const CtfImage = ({
  url,
  width,
  height,
  title,
  nextImageProps,
}: ImageProps) => {
  if (!url || !width || !height) return null;

  const blurURL = new URL(url);
  blurURL.searchParams.set("w", "10");

  return (
    <NextImage
      src={url}
      width={width}
      height={height}
      alt={title || ""}
      sizes="(max-width: 1200px) 100vw, 50vw"
      placeholder="blur"
      blurDataURL={blurURL.toString()}
      {...nextImageProps}
      className={clsx(nextImageProps?.className, "transition-all")}
    />
  );
};
