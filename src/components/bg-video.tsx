import React from 'react';

const VideoBackground = () => {
  return (
    <>
      <div className="fixed inset-0 z-10 overflow-hidden w-full h-screen">
        <video
          autoPlay
          loop
          muted
          playsInline 
          className="absolute min-w-full min-h-full object-cover opacity-40 w-full h-full"
        >
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>
      </div>
    </>
  );
};

export default VideoBackground; 
