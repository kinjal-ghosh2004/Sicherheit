import React from 'react';

export const PackageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-6 w-6" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={2}
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7v10l8 4m0-14L4 7m0 0l8 4m-8-4L4 3l8 4m-8 4v10l8 4m-8-14L4 3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10l8 4" />
  </svg>
);
