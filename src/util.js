export const playAudio = (isPlaying, audioRef) => {
    if (isPlaying) {
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
            console.log(playPromise);
            playPromise.then((audio) => {
                audioRef.current.play();
            });
        }
    }
}