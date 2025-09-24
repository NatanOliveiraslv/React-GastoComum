// src/components/SubmitButtonWatcher.js
import React, { useState, useEffect, useRef } from 'react';
import SubmitButton from './SubmitButton';

const SubmitButtonWatcher = ({ text, classButton, onClick, navbarHeight = 64 }) => {
  const [isFixed, setIsFixed] = useState(false); // Initially false, as the button won't be fixed at the top
  const targetRef = useRef(null); // Correctly initialize the ref with useRef()

  useEffect(() => {
    // Correctly get the current value of the ref inside the effect
    const currentTarget = targetRef.current;

    if (currentTarget) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          // The button should be fixed when the target is NOT intersecting
          setIsFixed(!entry.isIntersecting);
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.1,
        }
      );

      observer.observe(currentTarget);

      // Correctly use the variable from the effect scope in the cleanup function
      return () => {
        if (currentTarget) {
          observer.unobserve(currentTarget);
        }
      };
    }
  }, []); // The dependency array is empty because the ref is stable across renders

  return (
    <>
      {/* Target (marcador de posição) */}
      <div ref={targetRef} className="h-10 invisible" />
      
      {/* Botão Fixo (Flutuante) */}
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

      {/* Botão Padrão (aparece quando o flutuante some) */}
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