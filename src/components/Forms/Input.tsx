import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}, ref) => {
  const hasError = !!error;
  
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className={`h-5 w-5 ${hasError ? 'text-red-400' : 'text-gray-400'}`}>
              {icon}
            </span>
          </div>
        )}
        
        <input
          ref={ref}
          className={`
            block w-full rounded-lg border transition-colors
            ${icon && iconPosition === 'left' ? 'pl-10' : 'pl-3'}
            ${icon && iconPosition === 'right' ? 'pr-10' : 'pr-3'}
            py-2
            ${hasError 
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' 
              : 'border-gray-300 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
            }
            focus:outline-none focus:ring-2
            disabled:bg-gray-50 disabled:text-gray-500
            ${className}
          `}
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className={`h-5 w-5 ${hasError ? 'text-red-400' : 'text-gray-400'}`}>
              {icon}
            </span>
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;