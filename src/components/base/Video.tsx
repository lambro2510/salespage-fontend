import React, { useRef, useEffect, ReactNode } from 'react';
interface VideoBackgroundProps {
  videoUrl?: string;
  children?: ReactNode;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ videoUrl, children }) => {
  
  return (
    <div style={{ position: 'relative' }}>
      <video
        id='login-video'
        autoPlay
        loop
        muted
        style={{
          position: 'fixed',
          width: '100%',
          height: '100%'
        }}
      >
        <source src='bg-login.mp4' />
        {children}
      </video>
      
    </div>
  );
};

export default VideoBackground;
