interface Ethereum {
  isMetaMask?: boolean;
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  networkVersion: number;
  selectedAddress: string;
}

interface Window {
  ethereum?: Ethereum;
}
