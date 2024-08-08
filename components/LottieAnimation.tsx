// components/LottieAnimation.tsx
import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../public/customer-service-chat.json'; // Adjust the path to your animation file

interface LottieAnimationProps {
  height?: number;
  width?: number;
  animationData: object;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ height = 400, width = 400, animationData }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData,
  };

  return (
    <div style={{ height, width }}>
      <Lottie options={defaultOptions} height={height} width={width} />
    </div>
  );
};

export default LottieAnimation;
