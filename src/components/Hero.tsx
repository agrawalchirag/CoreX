import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";
import WalletButton from "@/components/WalletButton";
import WalletConnectModal from "@/components/WalletConnectModal";
import { useWalletModal } from "@/hooks/useWalletModal";

const Hero = () => {
  const { isOpen, openModal, setOpen } = useWalletModal();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block mb-6 px-6 py-2 bg-slate-800/50 backdrop-blur-xl rounded-full border border-blue-500/20">
            <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">🚀 Decentralized Finance Reimagined</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
            Next-Gen DeFi Platform{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              CoreX
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            A complete decentralized finance ecosystem. Trade, stake, farm yields, and provide liquidity 
            across multiple blockchains. Experience true DeFi with non-custodial wallets and smart contracts.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <WalletButton size="lg" onClick={openModal} />
            <Link to="/markets">
              <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800/50 text-lg px-8 py-6">
                Explore DeFi Markets
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Decentralized Trading</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Trade directly from your wallet with trustless smart contracts</p>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 mx-auto">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Non-Custodial</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Full control of your assets - your keys, your crypto</p>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4 mx-auto">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Multi-Chain DeFi</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Access DeFi protocols across Ethereum, BSC, Polygon & more</p>
            </div>
          </div>
        </div>
      </div>
      <WalletConnectModal open={isOpen} onOpenChange={setOpen} />
    </section>
  );
};

export default Hero;
