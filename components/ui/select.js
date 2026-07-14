import React from 'react';
import { ChevronDown } from 'lucide-react';

export const Select = React.forwardRef(({ 
  options = [],
  placeholder = 'Select an option',
  error = '',
  className = '',
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      <div className="relative">
        <select
          ref={ref}
          className={`w-full px-4 py-3 border border-gray-300 rounded appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 ${error ? 'border-red-500' : ''} ${className}`}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-3.5 pointer-events-none text-gray-600" size={20} />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
});

Select.displayName = 'Select';
