import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const Input = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  helperText,
  disabled = false,
  required = false,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

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
        {leftIcon && (
          <div className="absolute left-3.5 pointer-events-none text-[#737987]">
            {leftIcon}
          </div>
        )}
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`w-full text-sm bg-white border rounded-xl py-2.5 px-3.5 transition-all duration-200 outline-none text-[#171923] placeholder-[#737987]/60 ${
            leftIcon ? 'pl-10' : ''
          } ${isPassword || rightIcon ? 'pr-11' : ''} ${
            error
              ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
              : 'border-[#E8EAED] hover:border-[#6655D9]/50 focus:border-[#6655D9] focus:ring-2 focus:ring-[#6655D9]/20'
          } ${disabled ? 'bg-gray-50 cursor-not-allowed opacity-75' : ''}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 text-[#737987] hover:text-[#171923] p-1 rounded-lg transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
        {!isPassword && rightIcon && (
          <div className="absolute right-3.5 text-[#737987]">{rightIcon}</div>
        )}
      </div>
      {error ? (
        <p className="text-xs text-rose-500 mt-1 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-[#737987] mt-1">{helperText}</p>
      ) : null}
    </div>
  );
};
