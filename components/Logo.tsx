import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => (
  <img 
    src="https://i.ibb.co/bR5v5RgJ/image-2025-11-11-021657742.png" 
    alt="Swasth Logo" 
    className={className} 
  />
);

export default Logo;
