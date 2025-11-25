'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from './button';
import { Skeleton } from './skeleton';

interface CopyButtonProps {
  text: string;
  toastMessage: string;
  isLoading?: boolean;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  toastMessage,
  isLoading = false,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(toastMessage);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  };

  if (isLoading) {
    return <Skeleton className="h-8 w-8" />;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      className="size-8 shrink-0"
    >
      {copied ? (
        <Check className="size-4 text-green-500" />
      ) : (
        <Copy className="size-4" />
      )}
    </Button>
  );
};
