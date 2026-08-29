import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  interactive?: boolean;
  variant?: 'white' | 'semolina' | 'navy' | 'glass';
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  bordered?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  interactive = false,
  variant = 'white',
  elevation = 'sm',
  bordered = true,
  className = '',
  ...props
}) => {
  const variantStyles: Record<string, string> = {
    white: 'bg-white text-sbiroli-navy',
    semolina: 'bg-sbiroli-semolina-100 text-sbiroli-navy',
    navy: 'bg-sbiroli-navy text-white border-sbiroli-navy-700',
    glass: 'bg-white/90 backdrop-blur-md text-sbiroli-navy',
  };

  const elevationStyles: Record<string, string> = {
    none: '',
    sm: 'shadow-sbiroli-sm',
    md: 'shadow-sbiroli-md',
    lg: 'shadow-sbiroli-lg',
  };

  const borderStyle = bordered
    ? variant === 'navy'
      ? 'border border-sbiroli-navy-700/60'
      : 'border border-sbiroli-semolina-300/60'
    : '';

  const interactiveStyle = interactive
    ? 'transition-all duration-300 hover:-translate-y-1.5 hover:shadow-sbiroli-md cursor-pointer'
    : '';

  return (
    <div
      className={`rounded-sbiroli ${variantStyles[variant]} ${elevationStyles[elevation]} ${borderStyle} ${interactiveStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
