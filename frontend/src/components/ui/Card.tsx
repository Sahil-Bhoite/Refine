import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'bordered';
}

const Card = ({
  children,
  className,
  variant = 'default',
  ...props
}: CardProps) => {
  return (
    <div
      className={cn(
        'glass-card rounded-xl overflow-hidden',
        variant === 'default' ? 'shadow-xl' : 'border border-white/20',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardHeader = ({
  children,
  className,
  ...props
}: CardHeaderProps) => {
  return (
    <div
      className={cn('p-6 border-b border-white/10', className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const CardTitle = ({
  children,
  className,
  ...props
}: CardTitleProps) => {
  return (
    <h3
      className={cn('text-lg font-semibold text-gray-900', className)}
      {...props}
    >
      {children}
    </h3>
  );
};

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

const CardDescription = ({
  children,
  className,
  ...props
}: CardDescriptionProps) => {
  return (
    <p
      className={cn('text-sm text-gray-600 mt-1', className)}
      {...props}
    >
      {children}
    </p>
  );
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardContent = ({
  children,
  className,
  ...props
}: CardContentProps) => {
  return (
    <div
      className={cn('p-6', className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardFooter = ({
  children,
  className,
  ...props
}: CardFooterProps) => {
  return (
    <div
      className={cn('p-6 bg-black/5 backdrop-blur-sm border-t border-white/10', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };