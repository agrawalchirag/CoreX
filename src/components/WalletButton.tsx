import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { WALLET_BUTTON_STYLES } from "@/lib/walletConstants";
import { cn } from "@/lib/utils";

interface WalletButtonProps {
  size?: "default" | "lg";
  className?: string;
  onClick?: () => void;
}

const WalletButton = ({ size = "default", className, onClick }: WalletButtonProps) => {
  const { isConnected, formattedAddress } = useWallet();

  const baseStyles = isConnected ? WALLET_BUTTON_STYLES.connected : WALLET_BUTTON_STYLES.disconnected;
  const sizeStyles = size === "lg" ? "text-lg px-8 py-6 shadow-lg" : "";
  const shadowStyles = size === "lg" && isConnected ? "shadow-green-500/50" : size === "lg" ? "shadow-blue-500/50" : "";

  return (
    <Button
      size={size}
      onClick={onClick}
      className={cn(baseStyles, sizeStyles, shadowStyles, className)}
    >
      <Wallet className={cn(size === "lg" ? "mr-2 h-5 w-5" : "mr-2 h-4 w-4")} />
      {isConnected ? formattedAddress : "Connect Wallet"}
    </Button>
  );
};

export default WalletButton;

