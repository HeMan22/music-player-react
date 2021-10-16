import React from "react";

const LibrarySong = ({ currentSong }) => {
  return (
    <div className="library-song">
      <img alt={currentSong.name} src={currentSong.cover}></img>
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};
