import React from 'react';

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size = 'md', className = '' }) => {
  const sizeClass =
    size === 'sm' ? 'h-2 w-2' : size === 'lg' ? 'h-8 w-8' : 'h-4 w-4';
  return (
    <div
      role="status"
      className={`${sizeClass} animate-spin rounded-full border-2 border-t-transparent ${className}`}
    />
  );
}; 