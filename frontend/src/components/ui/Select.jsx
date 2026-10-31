import React from 'react';
import { ChevronDown } from 'lucide-react';

export const Select = ({
  label,
  id,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  error,
  helperText,
  disabled = false,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-semibold text-[#171923] mb-1.5"
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        <select
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`w-full text-sm bg-white border rounded-xl py-2.5 pl-3.5 pr-10 appearance-none transition-all duration-200 outline-none text-[#171923] cursor-pointer ${
            error
              ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
              : 'border-[#E8EAED] hover:border-[#6655D9]/50 focus:border-[#6655D9] focus:ring-2 focus:ring-[#6655D9]/20'
          } ${disabled ? 'bg-gray-50 cursor-not-allowed opacity-75' : ''}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-[#737987] absolute right-3.5 pointer-events-none" />
      </div>
      {error ? (
        <p className="text-xs text-rose-500 mt-1 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-[#737987] mt-1">{helperText}</p>
      ) : null}
    </div>
  );
};
