import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import AudioPlayer from "../audioPlayer"

function ImageUpload({ image, type }) {
  useEffect(() => {
    if (image) {
      type = type?.split("/").reverse().join("");
      type = type?.substr(0, 3);
      const postResult = (
        <video
          className="inp_img"
          controls
          autoPlay
          muted
          loop
          src={image}
          allow="fullscreen"
        ></video>
      );
      const emptyResult = (
        <img className="inp_img" src={image} rounded alt="" />
      );
      const audioResult = (
        <div className="inp_img">
          <img
            src="images/audio_2.gif"
            alt=""
            className="w-full object-cover h-full"
          />
         <AudioPlayer src={image} />
        </div>
      );
      if (
        type === "mp4" ||
        type === "mov" ||
        type === "avi" ||
        type === "m4v" ||
        type === "mpeg" ||
        type === "ogv" ||
        type === "webm" ||
        type === "wmv"
      ) {
        setPlayMan(postResult);
      }
      if (
        type === "gif" ||
        type === "png" ||
        type === "jpg" ||
        type === "bmp" ||
        type === "jpe" ||
        type === "svg" ||
        type === "web"
      ) {
        setPlayMan(emptyResult);
      }
      if (
        type === "mpeg" ||
        type === "mp3" ||
        type === "ogg" ||
        type === "wav" ||
        type === "flac"
      ) {
        setPlayMan(audioResult);
      }
    }
  }, [image]);

  const [playMan, setPlayMan] = useState("");

  return playMan;
}
export default ImageUpload;
