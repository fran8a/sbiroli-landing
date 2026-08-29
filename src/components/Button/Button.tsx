import React from 'react';

export type ButtonVariant = 'rosso' | 'navy' | 'gold' | 'outline-navy' | 'outline-white' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asAnchor?: boolean;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'rosso',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  asAnchor = false,
  href,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-sbiroli transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 select-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:translate-y-[1px]';

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5 shadow-sm',
    md: 'px-5 py-2.5 text-sm gap-2 shadow-sbiroli-sm',
    lg: 'px-7 py-3.5 text-base gap-2.5 shadow-sbiroli-md',
  };

  const variantStyles: Record<ButtonVariant, string> = {
    rosso: 'bg-sbiroli-rosso text-white hover:bg-sbiroli-rosso-600 active:bg-sbiroli-rosso-700 shadow-sbiroli-glow-rosso/40 hover:shadow-sbiroli-glow-rosso/70 focus-visible:ring-sbiroli-gold/70',
    navy: 'bg-sbiroli-navy text-white hover:bg-sbiroli-navy-700 active:bg-sbiroli-navy-900 shadow-sbiroli-md focus-visible:ring-sbiroli-gold/80',
    gold: 'bg-sbiroli-gold text-sbiroli-navy-900 hover:bg-sbiroli-gold-400 active:bg-sbiroli-gold-600 shadow-sbiroli-glow-gold/40 focus-visible:ring-sbiroli-navy/50 font-bold',
    'outline-navy': 'border-2 border-sbiroli-navy text-sbiroli-navy hover:bg-sbiroli-navy hover:text-white active:bg-sbiroli-navy-900 focus-visible:ring-sbiroli-rosso/50 bg-transparent',
    'outline-white': 'border-2 border-white text-white hover:bg-white hover:text-sbiroli-navy active:bg-sbiroli-semolina-100 focus-visible:ring-sbiroli-gold/80 bg-transparent backdrop-blur-sm',
    ghost: 'text-sbiroli-navy hover:bg-sbiroli-navy/10 active:bg-sbiroli-navy/20 focus-visible:ring-sbiroli-rosso/50 bg-transparent shadow-none',
  };

  const combinedClass = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (asAnchor && href) {
    return (
      <a href={href} className={combinedClass} aria-disabled={disabled}>
        {isLoading ? (
          <span className="inline-block animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </a>
    );
  }

  return (
    <button
      className={combinedClass}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
          <span>Procesando...</span>
        </span>
      ) : (
        <>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
