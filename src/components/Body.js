import React from "react";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import Header from "./Header";
import SongRow from "./SongRow";

import "./Body.css";
import { useDataLayerValue } from "./state/DataLayer";

function Body() {
  const [{ discover_weekly, spotify }, dispatch] = useDataLayerValue();

  const playPlaylist = (id) => {
    spotify
      .play({
        context_uri: `spotify:playlist:37i9dQZEVXcFopD3bxZ9mM`,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  const playSong = (id) => {
    spotify
      .play({
        uris: `spotify:track:${id}`,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  return (
    <div className="body">
      <Header />
      <div className="bodyContent">
        <div className="body__info">
          <img src={discover_weekly?.images[0].url} alt="" />
          <div className="body__infoText">
            <strong>PLAYLIST</strong>
            <h2>Discover Weekly</h2>
            <p>{discover_weekly?.description}</p>
          </div>
        </div>

        <div className="body__songs">
          <div className="body__icons">
            <PlayCircleFilledIcon
              onClick={playPlaylist}
              className="body__shuffle"
            />
            <FavoriteIcon fontSize="large" />
            <MoreHorizIcon />
          </div>
          {discover_weekly?.tracks.items.map((item) => {
            return (
              <SongRow
                key={item.track.id}
                playSong={playSong}
                track={item.track}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Body;