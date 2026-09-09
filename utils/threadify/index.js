"use client"
import React, { useEffect, useRef } from "react";
import './index.css'

export default function Threadify(props) {
  const { text = "fvrtrp", multiplier = 10, speed = 25, className = "" } = props;
  const rootRef = useRef(null);

  useEffect(() => {
    const parent = rootRef.current;
    if (!parent) return;

    parent.innerHTML = ``;
    const timeouts = [];
    const chars = text.split("");

    for (let i = 0; i < chars.length; i++) {
      const xDiv = document.createElement("div");
      xDiv.className = `x x-${i}`;
      for (let j = 0; j < multiplier; j++) {
        const zDiv = document.createElement("div");
        zDiv.innerText = chars[i];
        zDiv.className = `char x-${i} z-${j} float-${j} ${
          j > 0 ? "shadow" : "main"
        }`;
        zDiv.style.setProperty("--layer", String(j));
        zDiv.style.setProperty("--spin", `${speed}s`);
        const opacityMultiplier = parseFloat(`0.${j}`);
        zDiv.style.opacity = `${1 - opacityMultiplier}`;
        xDiv.appendChild(zDiv);
        timeouts.push(
          setTimeout(
            () => {
              zDiv.classList.add("float");
            },
            Math.floor(Math.random() * 280 * speed + j * 500)
          )
        );
      }
      parent.appendChild(xDiv);
    }

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [text, multiplier, speed]);

  return (
    <div ref={rootRef} className={`threadify my-8 ${className}`.trim()}>
      <h1>{text}</h1>
    </div>
  );
}
