'use client'
import React from 'react'
import Image from 'next/image'
import './index.css'
import { bodyfont } from '@/app/fonts';

function copyToClipboard(){
    var textArea = document.createElement("textarea");
    textArea.value = window.location.href;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
  
    var tooltip = document.getElementById("tooltiptext");
    tooltip.innerHTML = "Link copied";
  }
  
  function outFunc() {
    var tooltip = document.getElementById("tooltiptext");
    tooltip.innerHTML = "Copy Link";
  }

export default function Share() {
    return (
        <>
            <div className={`tooltipcontainer text-base ${bodyfont.className}`}>
                <Image
                    onClick={copyToClipboard}
                    onMouseOut={outFunc}
                    className="shareIcon"
                    src="/share.svg"
                    alt="Share"
                    width={25}
                    height={25}
                />
                <span id="tooltiptext" className="tooltiptext">Copy Link</span>
            </div>
        </>
    )
}