import { FC } from 'react';
import { Button } from '@telegram-apps/telegram-ui';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ 
  title = '出错了', 
  message, 
  onRetry 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div className="text-6xl mb-4">😔</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} size="s">
          重试
        </Button>
      )}
    </div>
  );
}; 