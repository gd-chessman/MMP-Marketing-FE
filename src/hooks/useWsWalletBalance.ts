import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export interface Balance {
  walletAddress: string;
  mmp: number;
  mpb: number;
  sol: number;
  usdt: number;
  usdc: number;
}

export function useWsWalletBalance(walletAddress?: string) {
  const [balances, setBalances] = useState<Balance>({
    walletAddress: '',
    mmp: 0,
    mpb: 0,
    sol: 0,
    usdt: 0,
    usdc: 0,
  });
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!walletAddress) {
      setError('Không tìm thấy địa chỉ ví');
      return;
    }

    const socket: Socket = io(process.env.NEXT_PUBLIC_WS_URL, {
      path: '/socket.io',
      transports: ['websocket', 'polling'],
    });

    socket.on('connect', () => {
      setIsConnected(true);
      setError(null);
      socket.emit('subscribeBalance', walletAddress);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('balanceUpdate', (data: Balance) => {
      setBalances(data);
      setError(null);
    });

    socket.on('error', (error: { message: string }) => {
      setError(error.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [walletAddress]);

  return { balances, isConnected, error };
} 