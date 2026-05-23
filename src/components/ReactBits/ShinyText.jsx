import React from 'react';

export default function ShinyText({
  text = '',
  className = '',
  disabled = false,
  speed = '4s'
}) {
  const styles = {
    background: 'linear-gradient(120deg, var(--brown-dark) 40%, #ffffff 50%, var(--brown-dark) 60%)',
    backgroundSize: '200% auto',
    color: 'transparent',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    animation: disabled ? 'none' : `shimmer-text ${speed} linear infinite`,
    display: 'inline-block'
  };

  return (
    <span className={`shiny-text ${className}`} style={styles}>
      {text}
    </span>
  );
}
