import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wallet, ExternalLink, CheckCircle2, AlertCircle, Loader2, Copy, Check, LogOut } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "sonner";
import { METAMASK_URL } from "@/lib/walletConstants";

const WalletConnectModal = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const { connectWallet, address, isConnected, loading, isMetaMaskInstalled, formattedAddress, disconnectWallet } = useWallet();
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) setError(null);
  }, [open]);

  const handleConnect = async () => {
    if (!isMetaMaskInstalled) return setError("MetaMask is not installed");
    try {
      setError(null);
      await connectWallet();
      toast.success("Wallet connected!");
      setTimeout(() => onOpenChange(false), 1000);
    } catch (err: any) {
      const msg = err.message || "Connection failed";
      setError(msg);
      toast.error(msg);
    }
  };

  const handleCopyAddress = async () => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      toast.success("Address copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy address");
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
    onOpenChange(false);
    toast.success("Wallet disconnected");
  };

  const WalletIcon = () => (
    <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
      <Wallet className="w-6 h-6 text-orange-500" />
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-slate-900 border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl">
            {isConnected ? "Wallet Connected" : "Connect Wallet"}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {isConnected ? "Manage your wallet connection" : "Choose a wallet to connect"}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-4">
          {isConnected && address ? (
            <>
              <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  <p className="text-white font-semibold">Wallet Connected</p>
                </div>
                <div className="flex items-center justify-between gap-3 bg-slate-800/50 rounded-lg p-3">
                  <p className="text-slate-300 text-sm font-mono">{formattedAddress}</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCopyAddress}
                    className="h-8 w-8 p-0 hover:bg-slate-700"
                    title="Copy full address"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-400" />
                    )}
                  </Button>
                </div>
              </div>
              <Button
                onClick={handleDisconnect}
                variant="outline"
                className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Disconnect Wallet
              </Button>
            </>
          ) : (
            <>
              <div className="border border-slate-800 rounded-lg overflow-hidden hover:border-slate-700 transition-colors">
                <div className="w-full p-4 flex items-center justify-between bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <WalletIcon />
                    <div className="text-left">
                      <p className="text-white font-semibold">MetaMask</p>
                      <p className="text-slate-400 text-sm">
                        {isMetaMaskInstalled ? "Connect using MetaMask" : "MetaMask not installed"}
                      </p>
                    </div>
                  </div>
                  {isMetaMaskInstalled ? (
                    loading ? (
                      <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                    ) : (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleConnect}>
                        Connect
                      </Button>
                    )
                  ) : (
                    <Button size="sm" variant="outline" className="border-slate-700 text-white hover:bg-slate-700" onClick={() => window.open(METAMASK_URL, "_blank")}>
                      Install <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-red-400 text-sm font-medium">{error}</p>
                    {!isMetaMaskInstalled && (
                      <a href={METAMASK_URL} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm hover:underline mt-2 inline-flex items-center gap-1">
                        Install MetaMask <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {!isMetaMaskInstalled && !error && (
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-blue-400 text-sm">Please install MetaMask extension first.</p>
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletConnectModal;

