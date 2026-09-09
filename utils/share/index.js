'use client'
import React from 'react'
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
                <svg
                    onClick={copyToClipboard}
                    onMouseOut={outFunc}
                    className="shareIcon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 40 40"
                    width="25"
                    height="25"
                    aria-label="Share"
                    role="img"
                >
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M23.65649414 27.8999939C24.45654297 26.2000122 26.18151855 25 28.18151855 25c2.75 0 5 2.25 5 5s-2.25 5-5 5c-2.5250244 0-4.59997558-1.875-4.92504882-4.2999878l-9.82495118-7.125c-.92504882.875-2.1500244 1.4249878-3.5 1.4249878-2.75 0-5-2.25-5-5s2.25-5 5-5c1.3499756 0 2.57495118.5499878 3.5 1.4249878l9.82495118-7.125C23.58154297 6.875 25.65649414 5 28.18151855 5c2.75 0 5 2.25 5 5s-2.25 5-5 5c-2 0-3.72497558-1.2000122-4.5250244-2.8999939l-8.94995118 6.4750061c.125.4499817.22497558.9249878.22497558 1.4249878s-.09997558.9750061-.22497558 1.4249878l8.94995117 6.4750061zM30.68151855 10c0-1.375-1.125-2.5-2.5-2.5s-2.5 1.125-2.5 2.5 1.125 2.5 2.5 2.5 2.5-1.125 2.5-2.5zm-20.75 12.5c-1.375 0-2.5-1.125-2.5-2.5s1.125-2.5 2.5-2.5 2.5 1.125 2.5 2.5-1.125 2.5-2.5 2.5zm15.75 7.5c0 1.375 1.125 2.5 2.5 2.5s2.5-1.125 2.5-2.5-1.125-2.5-2.5-2.5-2.5 1.125-2.5 2.5z"
                    />
                </svg>
                <span id="tooltiptext" className="tooltiptext">Copy Link</span>
            </div>
        </>
    )
}
