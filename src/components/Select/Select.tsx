import React, { useId } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  placeholder?: string;
  containerClassName?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  helperText,
  placeholder,
  id: customId,
  required,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const generatedId = useId();
  const selectId = customId || generatedId;
  const errorId = `${selectId}-error`;
  const helperId = `${selectId}-helper`;

  const isInvalid = Boolean(error);

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      <label
        htmlFor={selectId}
        className="text-xs sm:text-sm font-bold text-sbiroli-navy flex items-center justify-between"
      >
        <span>
          {label}
          {required && <span className="text-sbiroli-rosso ml-1" aria-hidden="true">*</span>}
        </span>
      </label>

      <div className="relative flex items-center">
        <select
          id={selectId}
          required={required}
          aria-invalid={isInvalid}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={`w-full appearance-none rounded-sbiroli border bg-white px-3.5 py-2.5 pr-10 text-sm text-sbiroli-navy transition-all duration-200 focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed cursor-pointer ${
            isInvalid
              ? 'border-sbiroli-rosso focus:border-sbiroli-rosso focus:ring-sbiroli-rosso/20'
              : 'border-sbiroli-semolina-300 hover:border-sbiroli-navy-400 focus:border-sbiroli-navy focus:ring-sbiroli-navy/20'
          } ${className}`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute right-3 text-sbiroli-navy-500">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
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
