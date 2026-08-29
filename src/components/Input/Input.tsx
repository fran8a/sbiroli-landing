import React, { useId } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  id: customId,
  required,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const generatedId = useId();
  const inputId = customId || generatedId;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  const isInvalid = Boolean(error);

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      <label
        htmlFor={inputId}
        className="text-xs sm:text-sm font-bold text-sbiroli-navy flex items-center justify-between"
      >
        <span>
          {label}
          {required && <span className="text-sbiroli-rosso ml-1" aria-hidden="true">*</span>}
        </span>
      </label>

      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3.5 text-sbiroli-navy-400 pointer-events-none flex items-center">
            {leftIcon}
          </div>
        )}

        <input
          id={inputId}
          required={required}
          aria-invalid={isInvalid}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={`w-full rounded-sbiroli border bg-white px-3.5 py-2.5 text-sm text-sbiroli-navy placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed ${
            leftIcon ? 'pl-10' : ''
          } ${rightIcon ? 'pr-10' : ''} ${
            isInvalid
              ? 'border-sbiroli-rosso focus:border-sbiroli-rosso focus:ring-sbiroli-rosso/20'
              : 'border-sbiroli-semolina-300 hover:border-sbiroli-navy-400 focus:border-sbiroli-navy focus:ring-sbiroli-navy/20'
          } ${className}`}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3.5 text-sbiroli-navy-400 pointer-events-none flex items-center">
            {rightIcon}
          </div>
        )}
      </div>

      {error ? (
        <p id={errorId} className="text-xs text-sbiroli-rosso font-semibold flex items-center gap-1 mt-0.5">
          <span aria-hidden="true">⚠️</span> {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="text-xs text-gray-500 mt-0.5">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};
