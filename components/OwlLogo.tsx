
import React from 'react';

interface OwlLogoProps {
  className?: string;
  size?: number;
  color?: string;
}

const OwlLogo: React.FC<OwlLogoProps> = ({ className, size = 24, color = "#F59E0B" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <style>
        {`
          @keyframes leftEyeBlink {
            0%, 90%, 100% { transform: scaleY(1); opacity: 1; }
            95% { transform: scaleY(0.1); opacity: 0.8; }
          }
          .owl-left-eye {
            animation: leftEyeBlink 4s infinite;
            transform-origin: 38px 45px;
          }
        `}
      </style>
      
      {/* Ушки */}
      <path d="M25 22L40 15L35 30" fill={color} />
      <path d="M75 22L60 15L65 30" fill={color} />

      {/* Крылья (теперь более заметные) */}
      <path 
        d="M15 45C10 55 10 70 20 80L30 65L15 45Z" 
        fill={color} 
        fillOpacity="0.6"
      />
      <path 
        d="M85 45C90 55 90 70 80 80L70 65L85 45Z" 
        fill={color} 
        fillOpacity="0.6"
      />

      {/* Основное тело */}
      <path 
        d="M20 45C20 28.4315 33.4315 15 50 15C66.5685 15 80 28.4315 80 45V65C80 76.0457 71.0457 85 60 85H40C28.9543 85 20 76.0457 20 65V45Z" 
        fill={color} 
      />
      
      {/* Маска глаз */}
      <circle cx="38" cy="45" r="14" fill="black" fillOpacity="0.15" />
      <circle cx="62" cy="45" r="14" fill="black" fillOpacity="0.15" />

      {/* Глаза (Белки) */}
      <circle cx="38" cy="45" r="9" fill="white" className="owl-left-eye" />
      <circle cx="62" cy="45" r="9" fill="white" />

      {/* Зрачки */}
      <circle cx="38" cy="45" r="5" fill="#1A1D1A" className="owl-left-eye" />
      <circle cx="62" cy="45" r="5" fill="#1A1D1A" />
      
      {/* Блики */}
      <circle cx="36" cy="43" r="1.5" fill="white" fillOpacity="0.8" className="owl-left-eye" />
      <circle cx="60" cy="43" r="1.5" fill="white" fillOpacity="0.8" />

      {/* Клюв */}
      <path d="M50 62L44 52H56L50 62Z" fill="#1A1D1A" />

      {/* Оперение на грудке */}
      <path d="M42 72C42 72 45 75 50 75C55 75 58 72 58 72" stroke="#1A1D1A" strokeWidth="2" strokeOpacity="0.1" strokeLinecap="round" />
    </svg>
  );
};

export default OwlLogo;
