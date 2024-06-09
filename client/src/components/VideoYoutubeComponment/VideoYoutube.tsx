import React from "react";
interface YouTubeProps {
    src: string;
    title: string;
    style: React.CSSProperties;
  }
export default function VideoYoutube( { src, title,style } : YouTubeProps) {
    return (
          <div>
            <iframe
              src={src}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{ ...style }}
            ></iframe>
          </div>
      );
}
