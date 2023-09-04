import React from "react";

interface ArrowProps {
  className?: string;
}

export function Arrow({ className }: ArrowProps) {
  return (
    <svg className={className} width="28" height="17" viewBox="0 0 28 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="arrow">
        <path id="Vector 4" d="M26 2L14 14L2 2" stroke="#000AFF" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  )
}