import React from "react";
import { playAudio } from "../util";

const LibrarySong = ({
  song,
  songs,
  setCurrentSong,
  id,
  audioRef,
  isPlaying,
  setSongs,
}) => {
  const songSelectHandler = () => {
    //Long Way of doing it
    // const selectedSong = songs.filter((state) => state.id === id);
    // setCurrentSong(selectedSong[0]);


    //Short Way of doing it
    setCurrentSong(song);

    //Add Active State
    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });

    setSongs(newSongs);

    //Check if the Song is playing
    playAudio(isPlaying, audioRef);

  };

  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img alt={song.name} src={song.cover}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
