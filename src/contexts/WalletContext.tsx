import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from "react";
import { connectMetaMask, getConnectedAccount, formatAddress, listenToAccountChanges, checkMetaMaskInstalled } from "@/utils/wallet";
import { WALLET_STORAGE_KEY } from "@/lib/walletConstants";

interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  loading: boolean;
  formattedAddress: string;
  isMetaMaskInstalled: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error("useWallet must be used within a WalletProvider");
  return context;
};

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  useEffect(() => {
    setIsMetaMaskInstalled(checkMetaMaskInstalled());
  }, []);

  const updateAddress = useCallback((newAddress: string | null) => {
    setAddress(newAddress);
    if (newAddress) localStorage.setItem(WALLET_STORAGE_KEY, newAddress);
    else localStorage.removeItem(WALLET_STORAGE_KEY);
  }, []);

  useEffect(() => {
    const init = async () => {
      const saved = localStorage.getItem(WALLET_STORAGE_KEY);
      if (!saved) return setLoading(false);
      
      const current = await getConnectedAccount();
      if (current?.toLowerCase() === saved.toLowerCase()) setAddress(current);
      else localStorage.removeItem(WALLET_STORAGE_KEY);
      setLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (!isMetaMaskInstalled) return;
    return listenToAccountChanges((accounts) => updateAddress(accounts[0] || null));
  }, [isMetaMaskInstalled, updateAddress]);

  const connectWallet = useCallback(async () => {
    if (!isMetaMaskInstalled) throw new Error("MetaMask is not installed");
    setLoading(true);
    try {
      const addr = await connectMetaMask();
      updateAddress(addr);
    } finally {
      setLoading(false);
    }
  }, [isMetaMaskInstalled, updateAddress]);

  const disconnectWallet = useCallback(() => updateAddress(null), [updateAddress]);

  const value = useMemo(
    () => ({
      address,
      isConnected: !!address,
      connectWallet,
      disconnectWallet,
      loading,
      formattedAddress: formatAddress(address || ""),
      isMetaMaskInstalled,
    }),
    [address, connectWallet, disconnectWallet, loading, isMetaMaskInstalled]
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

