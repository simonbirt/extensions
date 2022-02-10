import { MediaItem as MediaItem, Movie, TVShow } from "../types";

export function isMovie(item: unknown): item is Movie {
  return item != null && (item as MediaItem).media_type === "movie";
}

export function isTVShow(item: unknown): item is TVShow {
  return item != null && (item as MediaItem).media_type === "tv";
}

export function isMediaItem(item: unknown): item is MediaItem {
  return isMovie(item) || isTVShow(item);
}
