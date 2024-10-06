import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
}

const Welcome: React.FC<TypewriterProps> = ({ text }) => {
  const [displayText, setDisplayText] = useState<string>('');
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text.charAt(index));
        setIndex(index + 1);
      }, 100); // Delay between each character
      return () => clearTimeout(timeout); // Cleanup timeout
    }
  }, [index, text]);

  return (
    <h1 className="font-bold text-gray-900 tracking-wide">
      {displayText}
      <span className="animate-pulse">|</span> {/* Blinking cursor */}
    </h1>
  );
};

export default Welcome;
