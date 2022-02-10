import fetch from "node-fetch";
import { getPreferenceValues, showToast, Toast } from "@raycast/api";
import { MediaItem, Preferences, SearchAPIResponse } from "../types";
import { isMediaItem } from "../helpers/type-guards";

const preferences = getPreferenceValues<Preferences>();

export async function getSearchResults (
  search: string
): Promise<MediaItem[]> {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${preferences.token}&language=en-US&query=${search}&page=1&include_adult=false`
    );

    if (response.status === 200) {
      const json = (await response.json()) as SearchAPIResponse;
      if (json.results) {
        return json.results.filter(isMediaItem);
      }
    } else {
      // api returned failure
      showToast(
        Toast.Style.Failure,
        `Status: ${response.status} [${response.statusText}]`
      );
    }

    // toast has shown, resolve promise
    return Promise.resolve([]);
  } catch (error) {
    showToast(Toast.Style.Failure, "Could not load results");
    return Promise.resolve([]);
  }
};
