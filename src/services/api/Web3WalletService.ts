import { Transaction, PublicKey, Connection } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress, createAssociatedTokenAccountInstruction } from '@solana/spl-token';
import axios from 'axios';
import axiosClient from '@/utils/axiosClient';
import { createLocalizedError, SERVICE_ERROR_KEYS } from '@/utils/errorMessages';
import { getCurrentLang } from '@/utils/getCurrentLang';

export class Web3WalletService {
  private static readonly SOLANA_RPC_ENDPOINT = 'https://lively-prettiest-ensemble.solana-mainnet.quiknode.pro/ba794df56fd8d99396adef456ae82f527553674a';
  private static readonly TOKEN_MINT_ADDRESSES = {
    SOL: 'So11111111111111111111111111111111111111112',
    USDT: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
    USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    MMP: 'FrbqVX4esWyfA4PvZngXKvbPenzMV7XVdLw6JdQMpTSC', // Thêm mint address của MMP token
    MPB: '6WVtnKZLQTbwYDpmzaHbrRSjiWnsCmRZqCoNWGe2ZSye'    // Thêm mint address của MPB token
  };

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

  // Check if user has token account
  static async checkTokenAccount(publicKey: string, tokenMint: string): Promise<boolean> {
    try {
      const connection = new Connection(this.SOLANA_RPC_ENDPOINT);
      const userPublicKey = new PublicKey(publicKey);
      const mintPublicKey = new PublicKey(tokenMint);
      
      const ata = await getAssociatedTokenAddress(
        mintPublicKey,
        userPublicKey
      );

      const accountInfo = await connection.getAccountInfo(ata);
      return accountInfo !== null;
    } catch (error) {
      console.error('Error checking token account:', error);
      return false;
    }
  }

  // Create token account if not exists
  static async createTokenAccountIfNeeded(publicKey: string, tokenMint: string): Promise<boolean> {
    try {
      const { solana } = window as any;
      if (!solana || !solana.isPhantom) {
        const currentLang = getCurrentLang();
        throw createLocalizedError(currentLang, SERVICE_ERROR_KEYS.PHANTOM_NOT_INSTALLED);
      }

      const connection = new Connection(this.SOLANA_RPC_ENDPOINT);
      const userPublicKey = new PublicKey(publicKey);
      const mintPublicKey = new PublicKey(tokenMint);

      // Check if account exists
      const hasAccount = await this.checkTokenAccount(publicKey, tokenMint);
      if (hasAccount) {
        return true;
      }

      // Create new transaction
      const transaction = new Transaction();
      
      // Get ATA address
      const ata = await getAssociatedTokenAddress(
        mintPublicKey,
        userPublicKey
      );

      // Add create ATA instruction
      transaction.add(
        createAssociatedTokenAccountInstruction(
          userPublicKey, // payer
          ata, // ata
          userPublicKey, // owner
          mintPublicKey // mint
        )
      );

      // Get latest blockhash
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = userPublicKey;

      // Sign and send transaction
      const signedTx = await solana.signAndSendTransaction(transaction);
      await connection.confirmTransaction(signedTx.signature);

      return true;
    } catch (error) {
      console.error('Error creating token account:', error);
      
      // Handle specific Phantom wallet errors
      if (error instanceof Error) {
        const currentLang = getCurrentLang();
        
        // Check for user rejection error
        if (error.message.includes('User rejected the request') || 
            error.message.includes('User rejected') ||
            error.message.includes('User cancelled')) {
          throw createLocalizedError(currentLang, SERVICE_ERROR_KEYS.PHANTOM_TRANSACTION_REJECTED);
        }
        
        // Check for other Phantom-specific errors
        if (error.message.includes('Wallet not connected')) {
          throw createLocalizedError(currentLang, SERVICE_ERROR_KEYS.PHANTOM_NOT_CONNECTED);
        }
        
        if (error.message.includes('Failed to create token account')) {
          throw createLocalizedError(currentLang, SERVICE_ERROR_KEYS.FAILED_TO_CREATE_TOKEN_ACCOUNT);
        }
      }
      
      return false;
    }
  }

  // Initialize Web3 swap
  static async initWeb3Swap(publicKey: string, inputToken: string, inputAmount: number, outputToken: string) {
    try {
      // Check and create ATA for output token if needed
      const outputMint = this.TOKEN_MINT_ADDRESSES[outputToken];
      if (outputMint) {
        const hasAccount = await this.checkTokenAccount(publicKey, outputMint);
        if (!hasAccount) {
          const created = await this.createTokenAccountIfNeeded(publicKey, outputMint);
          if (!created) {
            const currentLang = getCurrentLang();
            throw createLocalizedError(currentLang, SERVICE_ERROR_KEYS.FAILED_TO_CREATE_TOKEN_ACCOUNT);
          }
        }
      }

      const response = await axiosClient.post('/swap-orders/web3-wallet', {
        publicKey: publicKey,
        inputToken: inputToken,
        inputAmount: inputAmount,
        outputToken: outputToken
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
        const currentLang = getCurrentLang();
        console.log("currentLang", currentLang);
        throw createLocalizedError(currentLang, SERVICE_ERROR_KEYS.PHANTOM_NOT_INSTALLED);
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
      
      // Handle specific Phantom wallet errors
      if (error instanceof Error) {
        const currentLang = getCurrentLang();
        
        // Check for user rejection error
        if (error.message.includes('User rejected the request') || 
            error.message.includes('User rejected') ||
            error.message.includes('User cancelled')) {
          throw createLocalizedError(currentLang, SERVICE_ERROR_KEYS.PHANTOM_TRANSACTION_REJECTED);
        }
        
        // Check for other Phantom-specific errors
        if (error.message.includes('Wallet not connected')) {
          throw createLocalizedError(currentLang, SERVICE_ERROR_KEYS.PHANTOM_NOT_CONNECTED);
        }
      }
      
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
        const currentLang = getCurrentLang();
        throw createLocalizedError(currentLang, SERVICE_ERROR_KEYS.PHANTOM_NOT_INSTALLED);
      }

      // Connect to wallet
      const response = await solana.connect();
      return response.publicKey.toString();
    } catch (error) {
      console.error('Error connecting to Phantom wallet:', error);
      
      // Handle specific Phantom wallet errors
      if (error instanceof Error) {
        const currentLang = getCurrentLang();
        
        // Check for user rejection error
        if (error.message.includes('User rejected the request') || 
            error.message.includes('User rejected') ||
            error.message.includes('User cancelled')) {
          throw createLocalizedError(currentLang, SERVICE_ERROR_KEYS.PHANTOM_CONNECTION_REJECTED);
        }
        
        // Check for other connection errors
        if (error.message.includes('Wallet not connected') || 
            error.message.includes('Connection failed')) {
          throw createLocalizedError(currentLang, SERVICE_ERROR_KEYS.PHANTOM_CONNECTION_FAILED);
        }
      }
      
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

export const postSwapOrder = async ({ publicKey, inputToken, inputAmount, outputToken }: { 
  publicKey: string, 
  inputToken: string, 
  inputAmount: number,
  outputToken: string 
}) => {
    try {
        const temp = await axiosClient.post(`/swap-orders/web3-wallet`, { 
          publicKey, 
          inputToken, 
          inputAmount,
          outputToken 
        });
        return temp.data;
    } catch (e) {
        throw e;
    }
}