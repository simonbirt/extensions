import {
  ActionPanel,
  Action,
  List,
} from "@raycast/api";
import { getName, getYear } from "../helpers/property-helpers";
import { MediaItem } from "../types";

export function ListItem(props: { title: MediaItem }) {
  const title = props.title;

  // nicely space each row's plot content
  const takenSpace = getName(title).length + getYear(title).length + 4;

  return (
    <List.Item
      title={getName(title)}
      subtitle={`(${getYear(title)})  ${title.overview.slice(
        0,
        92 - takenSpace
      )}...`}
      //icon={`https://image.tmdb.org/t/p/w92${title.poster_path}`}
      accessoryTitle={`${title.vote_average}`}
      actions={
        <ActionPanel>
          <Action.OpenInBrowser
            url={`https://www.themoviedb.org/tv/${title.id}/`}
          />
          <Action.CopyToClipboard
            title="Copy URL"
            content={`https://www.themoviedb.org/tv/${title.id}/`}
          />
          <Action.CopyToClipboard
            title="Copy ID"
            shortcut={{ modifiers: ["opt", "cmd"], key: "return" }}
            content={`${title.id}`}
          />
        </ActionPanel>
      }
    />
  );
};
