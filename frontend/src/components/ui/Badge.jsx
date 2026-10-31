import React from 'react';

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  dot = false,
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full tracking-wide';

  const variants = {
    default: 'bg-gray-100 text-[#171923] border border-gray-200/80',
    primary: 'bg-[#F4F2FF] text-[#6655D9] border border-[#6655D9]/20',
    accent: 'bg-[#A99AF5]/20 text-[#5542C6] border border-[#A99AF5]/40',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200/60',
    danger: 'bg-rose-50 text-rose-700 border border-rose-200/60',
    info: 'bg-sky-50 text-sky-700 border border-sky-200/60',
    outline: 'border border-[#E8EAED] text-[#737987] bg-white',
    // Status specific presets
    verified: 'bg-emerald-50 text-emerald-700 border border-emerald-300 font-semibold',
    pending: 'bg-amber-50 text-amber-700 border border-amber-300 font-semibold',
    shortlisted: 'bg-purple-50 text-purple-700 border border-purple-300 font-semibold',
    selected: 'bg-emerald-100 text-emerald-800 border border-emerald-400 font-bold',
    rejected: 'bg-rose-50 text-rose-700 border border-rose-300',
    beginner: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    intermediate: 'bg-amber-50 text-amber-700 border border-amber-200',
    advanced: 'bg-rose-50 text-rose-700 border border-rose-200',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2',
  };

  const dotColors = {
    default: 'bg-gray-400',
    primary: 'bg-[#6655D9]',
    accent: 'bg-[#A99AF5]',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
    info: 'bg-sky-500',
    verified: 'bg-emerald-500',
    pending: 'bg-amber-500',
    shortlisted: 'bg-purple-500',
    selected: 'bg-emerald-600',
    rejected: 'bg-rose-500',
    beginner: 'bg-emerald-500',
    intermediate: 'bg-amber-500',
    advanced: 'bg-rose-500',
  };

  return (
    <span className={`${baseStyles} ${variants[variant] || variants.default} ${sizes[size]} ${className}`}>
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${dotColors[variant] || 'bg-[#6655D9]'}`}
        />
      )}
      {children}
    </span>
  );
};
