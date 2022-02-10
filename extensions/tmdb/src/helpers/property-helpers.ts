import { MediaItem } from "../types";
import { isMovie, isTVShow } from "./type-guards";

export function getYear(item: MediaItem): string {
  if (isMovie(item)) {
    return item.release_date.split("-")[0];
  } else if (isTVShow(item)) {
    return item.first_air_date.split("-")[0];
  } else {
    return "N/A";
  }
}

export function getName(item: MediaItem): string {
  if (isMovie(item)) {
    return "🎥 " + item.title;
  } else if (isTVShow(item)) {
    return "📺 " + item.name;
  } else {
    return "N/A";
  }
}
