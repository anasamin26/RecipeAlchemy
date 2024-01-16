import React, { useEffect, createRef } from "react";
import styles from "./bubble.module.css";

const BubbleText = ({ text }) => {
  const hoverTextRefs = Array.from({ length: text.length }, () => createRef());

  useEffect(() => {
    const addHoverClass = () => {
      hoverTextRefs.forEach((ref, index) => {
        const delay = 100 * index; 
        setTimeout(() => {
          if (ref.current) {
            ref.current.style.transition = "0.35s font-weight, 0.35s color";
            ref.current.style.fontWeight = "900";
            ref.current.style.color = "rgb(238, 242, 255)";
          }
        }, delay);
  
        setTimeout(() => {
          if (ref.current) {
            ref.current.style.transition = "0.35s font-weight, 0.35s color";
            ref.current.style.fontWeight = "thin";
            ref.current.style.color = "inherit";
          }
        }, delay + 1000); 
      });
    };
  
    const delay = 1000; // 1000 milliseconds = 1 second
    const timeoutId = setTimeout(addHoverClass, delay);
  
    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, []);
  

  return (
    <h2 className="text-center text-5xl font-thin text-purple-300 cursor-none" id="initialLoadElement">
      {text.split("").map((child, idx) => (
        <span ref={hoverTextRefs[idx]} className={styles.hoverText} key={idx}>
          {child}
        </span>
      ))}
    </h2>
  );
};

export default BubbleText;
