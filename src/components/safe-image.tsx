"use client"
import Image, { type ImageProps, type StaticImageData } from "next/image"

type SafeSrc = string | StaticImageData | undefined | null

function toStr(src: SafeSrc, fallback: string): string {
  if (typeof src === "string" && src.trim() !== "") return src
  if (src && typeof src === "object" && "src" in src && typeof src.src === "string") {
    return src.src
  }
  return fallback
}

/**
 * next/image wrapper that guarantees a valid string `src`
 * so internal code never hits `undefined.split`.
 */
export default function SafeImage({
  src,
  alt,
  fallback = "/placeholder.svg",
  ...rest
}: ImageProps & { src: SafeSrc; fallback?: string }) {
  return <Image src={toStr(src, fallback) || "/placeholder.svg"} alt={alt} {...rest} />
}
