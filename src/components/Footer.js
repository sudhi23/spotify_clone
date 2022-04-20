import React, { useEffect } from "react";
import { Grid, Slider } from "@material-ui/core";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";

import { useDataLayerValue } from "./state/DataLayer";

import "./Footer.css";

function Footer() {
  const [{ item, playing, spotify }, dispatch] = useDataLayerValue();

  useEffect(() => {
    if (spotify) {
      spotify.getMyCurrentPlaybackState().then((res) => {
        dispatch({
          type: "SET_PLAYING",
          playing: res.is_playing,
        });

        dispatch({
          type: "SET_ITEM",
          item: res.item,
        });
      });
    }
  }, [spotify]);

  const handlePlayPause = () => {
    playing ? spotify.pause() : spotify.play();
    dispatch({
      type: "SET_PLAYING",
      playing: !playing,
    });
  };

  const skip = (to) => {
    switch (to) {
      case "next":
        spotify.skipToNext();
        break;
      case "previous":
        spotify.skipToPrevious();
        break;
      default:
        console.log("What");
    }

    spotify.getMyCurrentPlayingTrack().then((res) => {
      dispatch({
        type: "SET_ITEM",
        item: res.item,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    });
  };

  return (
    <div className="footer">
      <div className="footerContent">
        <div className="footer__left">
          <div className="footer__leftContent">
            <img
              className="footer__albumLogo"
              src={item?.album.images[0].url}
              alt={item ? item.name : null}
            />
            {item ? (
              <div className="footer__songInfo">
                <h4>{item.name}</h4>
                <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
              </div>
            ) : (
              <div className="footer__songInfo">
                <h4>Not a song</h4>
                <p>...</p>
              </div>
            )}
          </div>
        </div>

        <div className="footer__center">
          <div className="footer__centerContent">
            <ShuffleIcon className="footer__green" />
            <SkipPreviousIcon
              onClick={skip.bind(this, "previous")}
              className="footer__icon"
            />
            {!playing ? (
              <PlayCircleOutlineIcon
                onClick={handlePlayPause}
                fontSize="large"
                className="footer__icon"
              />
            ) : (
              <PauseCircleOutlineIcon
                onClick={handlePlayPause}
                fontSize="large"
                className="footer__icon"
              />
            )}
            <SkipNextIcon
              onClick={skip.bind(this, "next")}
              className="footer__icon"
            />
            <RepeatIcon className="footer__green" />
          </div>
        </div>

        <div className="footer__right">
          <div className="footer__rightContent">
            <Grid container spacing={2}>
              <Grid item>
                <PlaylistPlayIcon />
              </Grid>
              <Grid item>
                <VolumeDownIcon />
              </Grid>
              <Grid className="footer__slider" item xs>
                <Slider aria-labelledby="continuous-slider" />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
