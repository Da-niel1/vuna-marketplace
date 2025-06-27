import React, { forwardRef } from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  label,
  error,
  helperText,
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
      
      <textarea
        ref={ref}
        className={`
          block w-full rounded-lg border px-3 py-2 transition-colors
          ${hasError 
            ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' 
            : 'border-gray-300 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
          }
          focus:outline-none focus:ring-2
          disabled:bg-gray-50 disabled:text-gray-500
          resize-none
          ${className}
        `}
        {...props}
      />
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;