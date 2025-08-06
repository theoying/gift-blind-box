import { FC } from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
}

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  text = '加载中...' 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={`animate-spin rounded-full border-b-2 border-blue-500 ${sizeClasses[size]}`}></div>
      {text && <p className="mt-2 text-sm text-gray-500">{text}</p>}
    </div>
  );
}; 