import { useState, useEffect } from "react";

const AudioPlayer = ({ src }) => {
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setAudio(new Audio(src));
  }, [src]);

  useEffect(() => {
    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    if (audio) {
      audio.addEventListener("timeupdate", onTimeUpdate);
      return () => {
        audio.removeEventListener("timeupdate", onTimeUpdate);
      };
    }
  }, [audio]);

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <div
      className="audio-player absolute bottom-0 w-full"
      style={{ padding: "10px", zIndex: "5", margin: "0" }}
    >
      <button onClick={togglePlay}>
        {isPlaying ? (
          <svg
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.961707 20.7636C0.961707 21.3679 1.1712 21.8792 1.59018 22.2976C2.00916 22.7159 2.53289 22.9367 3.16136 22.96H7.56066C8.16585 22.96 8.68958 22.7392 9.13184 22.2976C9.5741 21.856 9.78359 21.3447 9.76031 20.7636V3.15804C9.76031 2.55376 9.55082 2.03082 9.13184 1.58923C8.71286 1.14764 8.18913 0.938462 7.56066 0.961704H3.16136C2.55616 0.961704 2.03244 1.17088 1.59018 1.58923C1.14792 2.00758 0.93843 2.53052 0.961707 3.15804V20.7636ZM14.1596 20.7636C14.1596 21.3679 14.3807 21.8792 14.823 22.2976C15.2653 22.7159 15.7773 22.9367 16.3593 22.96H20.7586C21.3638 22.96 21.8875 22.7392 22.3297 22.2976C22.772 21.856 22.9815 21.3447 22.9582 20.7636V3.15804C22.9582 2.55376 22.7487 2.03082 22.3297 1.58923C21.9108 1.14764 21.387 0.938462 20.7586 0.961704H16.3593C15.7541 0.961704 15.242 1.17088 14.823 1.58923C14.404 2.00758 14.1829 2.53052 14.1596 3.15804V20.7636Z"
              fill="white"
            />
          </svg>
        ) : (
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 19.8035C0 20.5938 0.337517 21.2213 1.01255 21.6862C1.38499 21.8954 1.7807 22 2.19968 22C2.52556 22 2.85144 21.9186 3.17732 21.7559L20.8097 12.9699C21.1589 12.7839 21.4498 12.5166 21.6826 12.168C21.9154 11.8193 22.0201 11.4242 21.9968 10.9826C21.9735 10.5409 21.8688 10.1574 21.6826 9.83201C21.4964 9.5066 21.2054 9.2393 20.8097 9.03011L3.17732 0.244057C2.85144 0.0813523 2.52556 0 2.19968 0C1.80397 0 1.40826 0.104596 1.01255 0.313788C0.337517 0.755415 0 1.38299 0 2.19651V19.8035Z"
              fill="white"
            />
          </svg>
        )}
      </button>
      <button onClick={toggleMute} className="ml-2">
        {isMuted ? (
          <svg
            width="23"
            height="22"
            viewBox="0 0 23 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 7.94446L15.8115 14.077"
              stroke="white"
              stroke-miterlimit="10"
            />
            <path
              d="M15.8115 7.94446L22 14.077"
              stroke="white"
              stroke-miterlimit="10"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.810015 6.15936H5.3299L11.5832 0L12.9602 0.562866V21.4693L11.5832 22L5.3299 15.8085H0.810015L0 15.0044V6.96345L0.810015 6.15936ZM6.23711 14.4737L11.3402 19.5234V2.50877L6.23711 7.52632L5.6701 7.76754H1.62003V14.2003H5.6701L6.23711 14.4737Z"
              fill="black"
              className="fill-white"
            />
          </svg>
        ) : (
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.785714 6.15936H5.17L11.2357 0L12.5714 0.562866V21.4693L11.2357 22L5.17 15.8085H0.785714L0 15.0044V6.96345L0.785714 6.15936ZM6.05 14.4737L11 19.5234V2.50877L6.05 7.52632L5.5 7.76754H1.57143V14.2003H5.5L6.05 14.4737ZM22 10.9839C22.0041 13.5798 21.1276 16.0968 19.5203 18.105L18.4014 16.9632C19.7175 15.2615 20.432 13.1541 20.4286 10.9839C20.4286 8.73246 19.6743 6.6595 18.4108 5.01754L19.5297 3.87573C21.1308 5.88191 22.0037 8.39361 22 10.9839ZM18.8571 10.9839C18.8601 12.7267 18.3073 14.4229 17.2826 15.8149L16.1574 14.6634C16.894 13.5847 17.288 12.2999 17.2857 10.9839C17.2879 9.67312 16.8968 8.39323 16.1653 7.31725L17.2904 6.16579C18.2741 7.50863 18.8571 9.17632 18.8571 10.9839ZM15.7143 10.9839C15.7143 11.907 15.4628 12.769 15.0228 13.5023L13.8616 12.3155C14.0472 11.9001 14.144 11.4488 14.1453 10.992C14.1467 10.5352 14.0526 10.0834 13.8694 9.66681L15.0307 8.47836C15.4644 9.20848 15.7143 10.0673 15.7143 10.9839Z"
              fill="black"
              className="fill-white"
            />
          </svg>
        )}
      </button>
      <input
        type="range"
        min="0"
        step="0.01"
        max={audio ? Math.floor(audio.duration) : 0}
        value={audio ? Math.floor(currentTime) : 0}
        onChange={(e) => (audio.currentTime = e.target.value)}
      />

      <span className="font-sm flex">
        <span className="mr-1">
          {!isNaN(currentTime) ? `${formatTime(currentTime)}/ ` : "00:00/ "}
        </span>
        <span>
          {!isNaN(audio?.duration) ? formatTime(audio?.duration) : "00:00"}
        </span>
      </span>
    </div>
  );
};

export default AudioPlayer;
