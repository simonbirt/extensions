export interface SearchResult {
  id: number;
  media_type: string;
}

export interface MediaItem extends SearchResult {
  media_type: "tv" | "movie"; //  'tv', 'movie'
  poster_path: string; // "/bQnnKBe3VsvXKMoNCaYmRzs1Dup.jpg"
  vote_average: number; // 8.5
  popularity: number; // 438.15
  overview: string; // 
};

export interface Movie extends MediaItem {
  media_type: "movie";
  title: string;
  release_date: string; // "2022-02-03"
};

export interface TVShow extends MediaItem {
  media_type: "tv";
  name: string;
  first_air_date: string; // "2022-02-03"
};

export interface SearchAPIResponse {
  page: number;
  total_pages: number;
  total_results: number;
  results?: SearchResult[];
};

export interface Preferences {
  token: string;
}
