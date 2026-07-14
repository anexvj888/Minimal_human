import React from 'react';

export const Input = React.forwardRef(({ 
  className = '',
  type = 'text',
  placeholder = '',
  error = '',
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
