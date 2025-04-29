import React, { useState } from 'react';
import Lottie from 'react-lottie';

function AiTypingAnimation() {
  const [animationData] = useState(null);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div style={{ position: 'absolute', right: 10, bottom: 50 }}>
      <Lottie options={defaultOptions} height={150} width={150} />
    </div>
  );
}

export default AiTypingAnimation;
