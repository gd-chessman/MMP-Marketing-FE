interface PhantomProvider {
  isPhantom?: boolean;
  connect: () => Promise<{ publicKey: { toString: () => string } }>;
  signMessage: (message: Uint8Array, encoding: string) => Promise<{ signature: Uint8Array }>;
  publicKey: { toString: () => string };
  disconnect: () => Promise<void>;
}

declare global {
  interface Window {
    solana?: PhantomProvider;
  }
}

export {}; 