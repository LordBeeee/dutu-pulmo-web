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
    setDisplayedText('');

    // Dùng spread [...text] thay vì charAt để handle đúng emoji 4-byte (surrogate pairs)
    const chars = [...text];
    let index = 0;

    const timer = setInterval(() => {
      if (index < chars.length) {
        setDisplayedText((prev) => prev + chars[index]);
        index++;
      } else {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, onComplete]);

  // Render với \n -> <br/> để xuống dòng đúng
  return (
    <span className={className}>
      {displayedText.split('\n').map((line, i, arr) => (
        <React.Fragment key={i}>
          {line}
          {i < arr.length - 1 && <br />}
        </React.Fragment>
      ))}
    </span>
  );
};