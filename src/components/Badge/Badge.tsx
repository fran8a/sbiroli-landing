import React from 'react';

export type BadgeVariant = 'gold' | 'navy' | 'rosso' | 'semolina' | 'success';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  size = 'md',
  icon,
  className = '',
}) => {
  const sizeStyles: Record<BadgeSize, string> = {
    sm: 'px-2.5 py-0.5 text-xs font-semibold gap-1',
    md: 'px-3 py-1 text-xs sm:text-sm font-bold gap-1.5',
  };

  const variantStyles: Record<BadgeVariant, string> = {
    gold: 'bg-sbiroli-gold text-sbiroli-navy-900 border border-sbiroli-gold-600/30 shadow-sm',
    navy: 'bg-sbiroli-navy text-white border border-sbiroli-navy-700 shadow-sm',
    rosso: 'bg-sbiroli-rosso-50 text-sbiroli-rosso-700 border border-sbiroli-rosso-200',
    semolina: 'bg-sbiroli-semolina-200 text-sbiroli-navy-800 border border-sbiroli-semolina-300',
    success: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full select-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
