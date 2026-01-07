'use client';

import Image from 'next/image';
import { useState } from 'react';
import { IMAGES } from '@/utils/images';

interface AppImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallback?: string;
  priority?: boolean;
}

const AppImage = ({ 
  src, 
  alt, 
  width = 24, 
  height = 24, 
  className = '', 
  fallback = IMAGES.AVATAR_PLACEHOLDER,
  priority = false 
}: AppImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallback);
    }
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
      priority={priority}
      // Add unoptimized for static export compatibility
      unoptimized={true}
    />
  );
};

export default AppImage;