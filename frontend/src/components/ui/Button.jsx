import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = '',
  type = 'button',
  onClick,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none select-none';

  const variants = {
    primary: 'bg-[#6655D9] hover:bg-[#5542C6] text-white shadow-button focus:ring-[#6655D9]',
    secondary: 'bg-[#F4F2FF] hover:bg-[#EBE6FF] text-[#6655D9] border border-[#6655D9]/20 focus:ring-[#6655D9]',
    accent: 'bg-[#A99AF5] hover:bg-[#8D7CEB] text-[#171923] font-semibold focus:ring-[#A99AF5]',
    outline: 'border border-[#E8EAED] hover:border-[#6655D9] bg-white text-[#171923] hover:text-[#6655D9] focus:ring-[#6655D9]',
    ghost: 'text-[#737987] hover:text-[#171923] hover:bg-gray-100/80 focus:ring-gray-300',
    danger: 'bg-rose-500 hover:bg-rose-600 text-white shadow-sm focus:ring-rose-500',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm focus:ring-emerald-500',
    dark: 'bg-[#171923] hover:bg-black text-white focus:ring-gray-800'
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
    icon: 'p-2.5 rounded-xl'
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
