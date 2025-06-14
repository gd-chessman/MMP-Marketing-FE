import axiosClient from "@/utils/axiosClient";
import { Transaction } from '@solana/web3.js';

export class Web3WalletService {
  // Check if Phantom wallet is installed
  static isPhantomInstalled(): boolean {
    if (typeof window !== 'undefined') {
      const { solana } = window as any;
      return solana && solana.isPhantom;
    }
    return false;
  }

  // Get connected public key
  static getPublicKey(): string | null {
    if (typeof window !== 'undefined') {
      const { solana } = window as any;
      return solana?.publicKey?.toString() || null;
    }
    return null;
  }

  // Initialize Web3 swap
  static async initWeb3Swap(publicKey: string, inputToken: string, inputAmount: number) {
    try {
      const response = await axiosClient.post('/swap-orders/web3-wallet', {
        publicKey: publicKey,
        inputToken: inputToken,
        inputAmount: inputAmount
      });
      
      return response.data;
    } catch (error) {
      console.error('Error initializing Web3 swap:', error);
      throw error;
    }
  }

  // Sign and send transaction
  static async signAndSendTransaction(serializedTx: string): Promise<string> {
    try {
      const { solana } = window as any;
      
      if (!solana || !solana.isPhantom) {
        throw new Error('Phantom wallet is not installed');
      }

      // Deserialize transaction from base64
      const decoded = atob(serializedTx);
      const bytes = new Uint8Array(decoded.length); 
      for (let i = 0; i < decoded.length; i++) {
        bytes[i] = decoded.charCodeAt(i);
      }

      // Create Transaction object from bytes
      const transaction = Transaction.from(bytes);

      // Sign and send transaction
      const signedTx = await solana.signAndSendTransaction(transaction);
      
      return signedTx.signature;
    } catch (error) {
      console.error('Error signing Web3 transaction:', error);
      throw error;
    }
  }

  // Complete Web3 swap
  static async completeWeb3Swap(orderId: number, signature: string) {
    try {
      const response = await axiosClient.post('/swap-orders/web3-wallet/complete', {
        orderId: orderId,
        signature: signature
      });
      
      return response.data;
    } catch (error) {
      console.error('Error completing Web3 swap:', error);
      throw error;
    }
  }

  // Connect to Phantom wallet
  static async connectWallet(): Promise<string> {
    try {
      const { solana } = window as any;
      
      if (!solana || !solana.isPhantom) {
        throw new Error('Phantom wallet is not installed');
      }

      // Connect to wallet
      const response = await solana.connect();
      return response.publicKey.toString();
    } catch (error) {
      console.error('Error connecting to Phantom wallet:', error);
      throw error;
    }
  }

  // Disconnect from Phantom wallet
  static async disconnectWallet(): Promise<void> {
    try {
      const { solana } = window as any;
      
      if (solana && solana.disconnect) {
        await solana.disconnect();
      }
    } catch (error) {
      console.error('Error disconnecting from Phantom wallet:', error);
      throw error;
    }
  }
} 

export const postSwapOrder = async ({ publicKey, inputToken, inputAmount }: { publicKey: string, inputToken: string, inputAmount: number }) => {
    try {
        const temp = await axiosClient.post(`/swap-orders/web3-wallet`, { publicKey, inputToken, inputAmount });
        return temp.data;
    } catch (e) {
        throw e;
    }
}