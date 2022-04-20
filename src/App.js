import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";

import { getTokenFromUri } from "./api/spotify";
import Login from "./components/Login";
import Player from "./components/Player";
import { useDataLayerValue } from "./components/state/DataLayer";

import "./App.css";

const spotify = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    if (token) {
      spotify.setAccessToken(token);
    } else {
      const hash = getTokenFromUri();
      window.location.hash = "";
      const _token = hash.access_token;
      if (_token) {
        dispatch({
          type: "SET_TOKEN",
          token: _token,
        });

        spotify.setAccessToken(_token);
      }
    }

    spotify.getMe().then((user) => {
      dispatch({
        type: "SET_USER",
        user: user,
      });

      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });
    });

    spotify.getUserPlaylists().then((playlists) => {
      dispatch({
        type: "SET_PLAYLISTS",
        playlists: playlists,
      });
    });

    spotify
      .getPlaylist("37i9dQZEVXcFopD3bxZ9mM")
      .then((response) => {
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        });
      })
      .catch((err) => console.log(err));
  }, [token]);

  return <div className="app">{token ? <Player /> : <Login />}</div>;
}

export default App;
