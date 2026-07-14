import React from 'react';

export const Card = ({ className = '', children, ...props }) => (
  <div 
    className={`bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ className = '', children, ...props }) => (
  <div className={`p-6 border-b border-gray-200 ${className}`} {...props}>
    {children}
  </div>
);

export const CardContent = ({ className = '', children, ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ className = '', children, ...props }) => (
  <div className={`p-6 border-t border-gray-200 flex gap-4 ${className}`} {...props}>
    {children}
  </div>
);
