interface EthereumProvider {
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on: (event: string, handler: Function) => void;
  removeListener: (event: string, handler: Function) => void;
  isMetaMask?: boolean;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

const getEthereum = () => typeof window !== "undefined" && window.ethereum?.isMetaMask ? window.ethereum : null;

export const checkMetaMaskInstalled = () => !!getEthereum();

const requestAccounts = async (method: "eth_requestAccounts" | "eth_accounts") => {
  const ethereum = getEthereum();
  if (!ethereum) throw new Error("MetaMask is not installed");
  const accounts = await ethereum.request({ method });
  return accounts?.[0] || null;
};

export const connectMetaMask = async (): Promise<string> => {
  try {
    const address = await requestAccounts("eth_requestAccounts");
    if (!address) throw new Error("No accounts found. Please unlock MetaMask.");
    return address;
  } catch (error: any) {
    if (error.code === 4001) throw new Error("Connection rejected");
    throw error;
  }
};

export const getConnectedAccount = async (): Promise<string | null> => {
  try {
    return await requestAccounts("eth_accounts");
  } catch {
    return null;
  }
};

export const formatAddress = (address: string) => 
  address?.length > 10 ? `${address.slice(0, 6)}...${address.slice(-4)}` : address || "";

const createListener = (event: string, callback: Function) => {
  const ethereum = getEthereum();
  if (!ethereum) return () => {};
  ethereum.on(event, callback);
  return () => ethereum.removeListener(event, callback);
};

export const listenToAccountChanges = (callback: (accounts: string[]) => void) =>
  createListener("accountsChanged", callback);

