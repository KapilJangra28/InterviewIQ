import React from 'react';

export const Card = ({
  children,
  className = '',
  glass = false,
  hover = false,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border transition-all duration-300 ${
        glass
          ? 'glass-panel'
          : 'bg-white border-[#E8EAED] shadow-card'
      } ${
        hover ? 'hover:shadow-card-hover hover:border-[#6655D9]/40 hover:-translate-y-0.5 cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 border-b border-[#E8EAED]/60 flex items-center justify-between gap-4 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-bold text-[#171923] tracking-tight ${className}`}>
    {children}
  </h3>
);

export const CardDescription = ({ children, className = '' }) => (
  <p className={`text-xs text-[#737987] mt-1 leading-relaxed ${className}`}>
    {children}
  </p>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`p-6 pt-0 border-t border-[#E8EAED]/40 flex items-center justify-between gap-4 ${className}`}>
    {children}
  </div>
);
