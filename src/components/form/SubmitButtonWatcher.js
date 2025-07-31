// src/components/SubmitButtonWatcher.js
import React, { useState, useEffect, useRef } from 'react';
import SubmitButton from './SubmitButton';

const SubmitButtonWatcher = ({ text, classButton, onClick, navbarHeight = 64 }) => {
  const [isFixed, setIsFixed] = useState(true);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFixed(!entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Botão Fixo */}
      <div
        className={`fixed left-0 right-0 p-4 shadow-lg z-40 transition-all duration-300 ease-in-out ${
          isFixed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'
        }`}
        style={{ bottom: `${navbarHeight}px` }}
      >
        <SubmitButton
          text={text}
          classButton={`${classButton} w-full`}
          onClick={onClick}
        />
      </div>

      {/* Target (marcador de posição) */}
      <div ref={targetRef} style={{ height: '1px', opacity: 0, pointerEvents: 'none' }} />

      {!isFixed && (
         <div className="mt-4 pb-6">
            <SubmitButton
                text={text}
                classButton={classButton}
                onClick={onClick}
            />
         </div>
      )}
    </>
  );
};

export default SubmitButtonWatcher;