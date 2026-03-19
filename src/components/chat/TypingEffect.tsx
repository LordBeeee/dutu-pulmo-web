import React, { useState, useEffect } from 'react';

interface TypingEffectProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

export const TypingEffect: React.FC<TypingEffectProps> = ({
  text,
  speed = 20,
  onComplete,
  className,
}) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, onComplete]);

  return <span className={className}>{displayedText}</span>;
};
