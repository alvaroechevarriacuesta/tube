'use client';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useCurrentUser } from '@coinbase/cdp-hooks';
import { useAccount } from 'wagmi';
import { DisplayWalletDialogContent } from './display';
import { ConnectWalletDialogContent } from './connect';
import { useSearchParams } from 'next/navigation';

interface Props {
  children?: React.ReactNode;
  // Optional controlled props - when provided, dialog becomes controlled
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const WalletDialog: React.FC<Props> = ({
  children,
  open,
  onOpenChange,
}) => {
  const searchParams = useSearchParams();

  const { address } = useAccount();

  const { currentUser } = useCurrentUser();

  // Determine if controlled or uncontrolled
  const isControlled = open !== undefined && onOpenChange !== undefined;

  const dialogProps = isControlled
    ? { open, onOpenChange }
    : { defaultOpen: searchParams.get('onramp') === 'true' };

  return (
    <Dialog {...dialogProps}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent
        className="p-0 overflow-hidden sm:max-w-md"
        showCloseButton={false}
      >
        {address ? (
          <DisplayWalletDialogContent
            address={address}
            user={currentUser ?? undefined}
            defaultTab={
              searchParams.get('onramp') === 'true' ? 'deposit' : 'wallet'
            }
          />
        ) : (
          <ConnectWalletDialogContent />
        )}
      </DialogContent>
    </Dialog>
  );
};
