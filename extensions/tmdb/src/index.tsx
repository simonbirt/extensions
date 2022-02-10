import { List } from "@raycast/api";
import { useEffect, useState } from "react";
import { MediaItem } from "./types";
import { getSearchResults } from "./api";
import { ListItem } from "./components/ListItem";

export default function SearchResults() {
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [titles, setTitles] = useState<MediaItem[]>([]);

  useEffect(() => {
    async function fetch() {
      const data: MediaItem[] = await getSearchResults(search);
      setTitles(() => data);
      setTimeout(() => setLoading(false), 400);
    }

    if (search.length > 0) {
      setLoading(true);
      setTitles([]);
      fetch();
    }
  }, [search]);

  const bestMatch = titles.length > 0 ? titles[0] : null;
  const similar =
    titles.length > 1 ? titles.slice(1, titles.length) : null;

  return (
    <List
      throttle
      isLoading={loading}
      onSearchTextChange={setSearch}
      searchBarPlaceholder="Search TMDb for titles by name..."
    >
      {!loading ? (
        <>
          {bestMatch ? (
            <List.Section
              title="Best Match"
            >
              <ListItem title={bestMatch} />
            </List.Section>
          ) : null}
          {similar ? (
            <List.Section
              title="Similar"
              subtitle={`${similar.length} further result${similar.length > 1 ? 's' : ''}`}
            >
              {similar.map((title) => (
                <ListItem title={title} key={title.id} />
              ))}
            </List.Section>
          ) : null}
        </>
      ) : null}
    </List>
  );
}
