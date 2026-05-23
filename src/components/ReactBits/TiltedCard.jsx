import React, { useRef, useState } from 'react';

export default function TiltedCard({
  children,
  className = '',
  maxRotation = 10,
  scale = 1.03,
  onClick
}) {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate cursor position inside the card relative to center (from -0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Set rotation degrees
    setRotation({
      x: -y * maxRotation, // Mouse moving down tilts top backward
      y: x * maxRotation   // Mouse moving right tilts right forward
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const transformStyle = isHovered
    ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${scale})`
    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: transformStyle,
        transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
    >
      <div style={{ transform: 'translateZ(15px)', transformStyle: 'preserve-3d', height: '100%', width: '100%' }}>
        {children}
      </div>
    </div>
  );
}
