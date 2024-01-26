"use client";
import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ url }: { url: string }) => {
  return (
    <div>
      <ReactPlayer url={url} controls={true} light={false} pip={true} />
      <source src={url} type="video/mp4" />
    </div>
  );
};

export default VideoPlayer;
