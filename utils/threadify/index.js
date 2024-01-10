"use client"
import React, { useEffect } from "react";
import './index.css'

export default function Threadify(props) {
  const { text = "fvrtrp", multiplier = 10, speed=25 } = props;

  useEffect(() => {
    threadify(text);
  }, []);

  function threadify(text) {
    const parent = document.querySelector(".threadify");
    parent.innerHTML = ``;
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
        zDiv.style.animationDuration = `${speed}s`
        // zDiv.style.filter = `blur(${j * 5}px)`;
        const opacityMultiplier = parseFloat(`0.${j}`);
        zDiv.style.opacity = `${1 - opacityMultiplier}`;
        xDiv.appendChild(zDiv);
        setTimeout(
          () => {
            zDiv.classList.add("float");
          },
          //j * 1000 + i * 1000
          Math.floor(Math.random() * 280*speed + j * 500)
        );
      }
      parent.appendChild(xDiv);
    }
  }

  return <div className="threadify my-8"><h1>{text}</h1></div>;
}
