import React from 'react';

export const Button = React.forwardRef(({ 
  className = '', 
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  ...props 
}, ref) => {
  const baseStyles = 'font-bold transition-all duration-200 inline-flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 uppercase tracking-wide text-sm';
  
  const variants = {
    primary: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600 shadow-md hover:shadow-lg',
    secondary: 'bg-white text-red-600 border-2 border-red-600 hover:bg-red-50 focus:ring-red-600',
    accent: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600 shadow-lg hover:shadow-xl',
    ghost: 'text-red-600 hover:bg-red-50 focus:ring-red-600',
    outline: 'border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white focus:ring-red-600 font-bold',
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  return (
    <button
      ref={ref}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
