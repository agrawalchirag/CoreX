import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import WalletButton from "@/components/WalletButton";
import WalletConnectModal from "@/components/WalletConnectModal";
import { useWalletModal } from "@/hooks/useWalletModal";

const Navigation = () => {
  const { isAuthenticated, loading } = useAuth();
  const { isOpen, openModal, setOpen } = useWalletModal();

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-2xl font-bold text-white">
              Core<span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">X</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-300 hover:text-white transition-colors">
              DeFi Features
            </a>
            <a href="#stats" className="text-slate-300 hover:text-white transition-colors">
              TVL Stats
            </a>
            <Link to="/markets" className="text-slate-300 hover:text-white transition-colors">
              Markets
            </Link>
            <Link to="/trading" className="text-slate-300 hover:text-white transition-colors">
              Trade
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            {isAuthenticated && !loading ? (
              <Link to="/dashboard">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <WalletButton onClick={openModal} />
                <Link to="/login">
                  <Button variant="ghost" className="text-white hover:bg-white/10 hidden sm:flex">
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <WalletConnectModal open={isOpen} onOpenChange={setOpen} />
    </nav>
  );
};

export default Navigation;
