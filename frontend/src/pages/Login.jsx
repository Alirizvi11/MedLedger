import React, { useState } from 'react';
import { 
  ArrowLeft, Mail, Lock, Wallet, Eye, EyeOff, CheckCircle, AlertCircle, Shield, Moon, Sun
} from 'lucide-react';

// Floating Particles Component
const FloatingParticles = ({ isDark, count = 30 }) => {
  const particles = Array.from({ length: count }, (_, i) => i);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle}
          className={`absolute w-1 h-1 rounded-full animate-pulse opacity-30 ${
            isDark ? 'bg-cyan-400' : 'bg-blue-600'
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
};

// Theme Toggle Component
const ThemeToggle = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`fixed top-6 right-6 z-50 w-12 h-12 rounded-full ${
        isDark 
          ? 'bg-white/10 hover:bg-white/20 border border-white/20' 
          : 'bg-gray-900/10 hover:bg-gray-900/20 border border-gray-900/20'
      } backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110`}
    >
      {isDark ? (
        <Sun size={20} className="text-yellow-400" />
      ) : (
        <Moon size={20} className="text-gray-700" />
      )}
    </button>
  );
};

// Background Component
const Background = ({ isDark }) => (
  <div className="absolute inset-0">
    {/* Grid Pattern */}
    <div className={`absolute inset-0 ${
      isDark 
        ? 'bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)]' 
        : 'bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)]'
    } bg-[size:50px_50px]`} />
    
    {/* Floating Particles */}
    <FloatingParticles isDark={isDark} />
    
    {/* Central Glow */}
    <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse ${
      isDark 
        ? 'bg-gradient-to-r from-cyan-400/15 to-purple-600/15' 
        : 'bg-gradient-to-r from-blue-400/20 to-purple-500/20'
    }`} />
  </div>
);

// Login Page Component
const Login = ({ onLoginSuccess, onBack, isDark, onToggleTheme }) => {
  const [email, setEmail] = useState("demo@medledger.io");
  const [password, setPassword] = useState("demo123");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginStep, setLoginStep] = useState("credentials"); // credentials, wallet, success

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return setError("Please enter email and password");
    }

    setIsLoading(true);
    setError("");

    try {
      await new Promise((res) => setTimeout(res, 1500));
      setLoginStep("wallet");
    } catch {
      setError("Login failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWalletConnect = async (walletType) => {
    setIsLoading(true);
    setError("");

    try {
      await new Promise((res) => setTimeout(res, 2000));
      setLoginStep("success");
      setTimeout(() => {
        onLoginSuccess();
      }, 1500);
    } catch {
      setError(`Failed to connect ${walletType}. Try again.`);
      setIsLoading(false);
    }
  };

  return (
    <div className={`relative min-h-screen font-sans overflow-hidden transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'
    }`}>
      
      <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
      <Background isDark={isDark} />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className={`w-full max-w-md p-8 rounded-3xl backdrop-blur-md border shadow-2xl animate-fadeIn ${
          isDark 
            ? 'bg-gray-900/50 border-gray-800/50' 
            : 'bg-white/80 border-gray-200/50'
        }`}>
          
          <button
            onClick={onBack}
            className={`absolute top-6 left-6 p-2 rounded-full transition-colors ${
              isDark ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft size={20} />
          </button>

          <div className="text-center mb-8">
            <div className={`w-16 h-16 mx-auto mb-6 rounded-xl flex items-center justify-center shadow-lg ${
              isDark 
                ? 'bg-gradient-to-br from-cyan-500 to-purple-600' 
                : 'bg-gradient-to-br from-blue-500 to-purple-600'
            }`}>
              <span className="text-white text-2xl font-black">M</span>
            </div>
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {loginStep === "credentials" && "Welcome Back 👋"}
              {loginStep === "wallet" && "Connect Wallet 🦊"}
              {loginStep === "success" && "Success! ✨"}
            </h1>
            <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {loginStep === "credentials" && "Sign in to your dashboard"}
              {loginStep === "wallet" && "Choose your preferred wallet"}
              {loginStep === "success" && "Redirecting to dashboard..."}
            </p>
          </div>

          {/* Credentials Step */}
          {loginStep === "credentials" && (
            <form onSubmit={handleEmailLogin} className="space-y-6">
              <div className="relative">
                <Mail className={`absolute left-3 top-4 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                <input
                  type="email"
                  className={`w-full pl-10 pr-4 py-4 rounded-xl border transition-all ${
                    isDark 
                      ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  }`}
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="relative">
                <Lock className={`absolute left-3 top-4 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                <input
                  type={showPassword ? "text" : "password"}
                  className={`w-full pl-10 pr-12 py-4 rounded-xl border transition-all ${
                    isDark 
                      ? 'bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  }`}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-4 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 ${
                  isDark 
                    ? 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:shadow-lg hover:shadow-cyan-500/25' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-700 hover:shadow-lg hover:shadow-blue-500/25'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                    Verifying...
                  </div>
                ) : (
                  "Continue with Email"
                )}
              </button>
            </form>
          )}

          {/* Wallet Step */}
          {loginStep === "wallet" && (
            <div className="space-y-4">
              <button
                onClick={() => handleWalletConnect("MetaMask")}
                disabled={isLoading}
                className={`w-full p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 ${
                  isDark 
                    ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800 hover:border-orange-500/50' 
                    : 'bg-white border-gray-300 hover:bg-gray-50 hover:border-orange-500/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Wallet size={20} className="text-white" />
                  </div>
                  <div className="text-left">
                    <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>MetaMask</div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Connect using MetaMask wallet</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleWalletConnect("Core Wallet")}
                disabled={isLoading}
                className={`w-full p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 ${
                  isDark 
                    ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800 hover:border-red-500/50' 
                    : 'bg-white border-gray-300 hover:bg-gray-50 hover:border-red-500/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                    <Shield size={20} className="text-white" />
                  </div>
                  <div className="text-left">
                    <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Core Wallet</div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Connect using Avalanche Core</div>
                  </div>
                </div>
              </button>

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm mt-4">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              {isLoading && (
                <div className="text-center">
                  <div className="w-6 h-6 border-2 border-cyan-500/50 border-t-cyan-500 rounded-full animate-spin mx-auto" />
                  <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Connecting wallet...</p>
                </div>
              )}
            </div>
          )}

          {/* Success Step */}
          {loginStep === "success" && (
            <div className="text-center">
              <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
              <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Connected Successfully!</h3>
              <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Taking you to dashboard...</p>
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full animate-pulse" style={{ width: '100%' }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;