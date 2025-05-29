import React from 'react';
import { cn } from '../../lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    children,
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    fullWidth = false,
    icon,
    iconPosition = 'left',
    disabled,
    ...props
  }, ref) => {
    // Base styles
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    
    // Variant styles
    const variantStyles = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
      secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 active:bg-secondary-800',
      outline: 'border border-gray-300 bg-transparent hover:bg-gray-50 active:bg-gray-100 text-gray-700',
      ghost: 'bg-transparent hover:bg-gray-100 active:bg-gray-200 text-gray-700',
      link: 'bg-transparent underline-offset-4 hover:underline text-primary-600 hover:text-primary-700',
    };
    
    // Size styles
    const sizeStyles = {
      sm: 'text-sm px-3 py-1.5 h-8',
      md: 'text-sm px-4 py-2 h-10',
      lg: 'text-base px-6 py-3 h-12',
    };
    
    // Width style
    const widthStyle = fullWidth ? 'w-full' : '';
    
    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          widthStyle,
          className
        )}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        
        {icon && iconPosition === 'left' && !isLoading && (
          <span className="mr-2">{icon}</span>
        )}
        
        {children}
        
        {icon && iconPosition === 'right' && (
          <span className="ml-2">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;