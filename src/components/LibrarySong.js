import React from "react";

const LibrarySong = ({
  song,
  songs,
  setCurrentSong,
  id,
  audioRef,
  isPlaying,
}) => {
  const songSelectHandler = () => {
    //Long Way of doing it
    // const selectedSong = songs.filter((state) => state.id === id);
    // setCurrentSong(selectedSong[0]);
    //Short Way of doing it
    setCurrentSong(song);
    //Check if the Song is playing
    if (isPlaying) {
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        console.log(playPromise);
        playPromise.then((audio) => {
          audioRef.current.play();
        });
      }
    }
  };

  return (
    <div onClick={songSelectHandler} className="library-song">
      <img alt={song.name} src={song.cover}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
