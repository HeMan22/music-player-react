import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { playAudio } from "../util";

const Player = ({ audioRef, currentSong, isPlaying, setIsPlaying, setSongInfo, songInfo, songs, setCurrentSong, setSongs }) => {

  //UseEffect

  useEffect(() => {
    //Add Active State
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
        return { ...song, active: true };
      } else {
        return { ...song, active: false };

      }
    });

    setSongs(newSongs);
  }, [currentSong]);



  //EventHandlers
  const playSongHandler = () => {
    // console.log(audioRef.current);
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };


  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    // if (direction === "skip-forward") {
    //   // setCurrentSong(songs[currentIndex + 1]);
    //   if (songs.length === currentIndex + 1) {
    //     setCurrentSong(songs[0]);
    //   }
    //   else {
    //     setCurrentSong(songs[currentIndex + 1]);
    //     console.log(audioRef.current);
    //   }
    // }

    // if (direction === "skip-back") {
    //   if (currentIndex === 0) {
    //     setCurrentSong(songs[songs.length - 1]);
    //   }
    //   else {
    //     setCurrentSong(songs[currentIndex - 1]);
    //   }
    // }

    //alternate Method (Best & Concise)
    if (direction === "skip-forward") {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      // setCurrentSong(songs[(currentIndex - 1 + songs.length) % songs.length]);
      setCurrentSong(songs[(currentIndex - 1) < 0 ? songs.length - 1 : currentIndex - 1]);
    }
    playAudio(isPlaying, audioRef);
  }

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  //Drag handler

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  //State


  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div className="track">
          <input
            value={songInfo.currentTime}
            min={0}
            max={songInfo.duration || 0}
            onChange={dragHandler}
            type="range"
          />
          <div className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler('skip-back')}
          className="skip-backward"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler('skip-forward')}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;
