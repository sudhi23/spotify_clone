import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";

import SidebarOption from "./SidebarOption";

import "./Sidebar.css";
import { useDataLayerValue } from "./state/DataLayer";

function Sidebar() {
  const [{ playlists }] = useDataLayerValue();

  return (
    <div className="sidebar">
      <div className="sidebarContent">
        <img
          className="sidebar__logo"
          src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
          alt="Spotify Logo"
        />
        <SidebarOption Icon={HomeIcon} title="Home" />
        <SidebarOption Icon={SearchIcon} title="Search" />
        <SidebarOption Icon={LibraryMusicIcon} title="Your Library" />
        <br />
        <strong className="sidebar__title">PLAYLISTS</strong>
        <hr />

        {playlists?.items?.map((playlist) => {
          return <SidebarOption key={playlist.id} title={playlist.name} />;
        })}
      </div>
    </div>
  );
}

export default Sidebar;
