

// import React, { useState, useEffect } from 'react';
// import { Rocket, Shield, Database, Users, Activity, ChevronRight, Moon, Sun } from 'lucide-react';

// // Floating Particles Component
// const FloatingParticles = ({ isDark }) => {
//   const particles = Array.from({ length: 30 }, (_, i) => i);
  
//   return (
//     <div className="absolute inset-0 overflow-hidden">
//       {particles.map((particle) => (
//         <div
//           key={particle}
//           className={`absolute w-1 h-1 rounded-full animate-pulse opacity-30 ${
//             isDark ? 'bg-cyan-400' : 'bg-blue-600'
//           }`}
//           style={{
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//             animationDelay: `${Math.random() * 3}s`,
//             animationDuration: `${2 + Math.random() * 2}s`
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// // Circular Orbit Component
// const CircularOrbit = ({ radius, duration, children, reverse = false }) => {
//   return (
//     <div 
//       className="absolute inset-0 flex items-center justify-center"
//       style={{
//         animation: `${reverse ? 'reverseRotate' : 'rotate'} ${duration}s linear infinite`
//       }}
//     >
//       <div 
//         className="relative"
//         style={{ width: radius * 2, height: radius * 2 }}
//       >
//         <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Icon Orbit Component
// const IconOrbit = ({ icon: Icon, className = "", isDark }) => (
//   <div className={`w-12 h-12 rounded-full ${
//     isDark 
//       ? 'bg-gradient-to-r from-cyan-400 to-purple-500' 
//       : 'bg-gradient-to-r from-blue-500 to-purple-600'
//   } flex items-center justify-center shadow-lg ${className}`}>
//     <Icon size={20} className="text-white" />
//   </div>
// );

// // Theme Toggle Component
// const ThemeToggle = ({ isDark, toggleTheme }) => (
//   <button
//     onClick={toggleTheme}
//     className={`fixed top-6 right-6 z-50 w-12 h-12 rounded-full ${
//       isDark 
//         ? 'bg-white/10 hover:bg-white/20 border border-white/20' 
//         : 'bg-gray-900/10 hover:bg-gray-900/20 border border-gray-900/20'
//     } backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110`}
//   >
//     {isDark ? (
//       <Sun size={20} className="text-yellow-400" />
//     ) : (
//       <Moon size={20} className="text-gray-700" />
//     )}
//   </button>
// );

// // Glowing Card Component
// const FeatureCard = ({ icon: Icon, title, description, delay, isDark }) => (
//   <div 
//     className={`backdrop-blur-md ${
//       isDark 
//         ? 'bg-gray-900/50 border-gray-800/50 hover:bg-gray-900/70 hover:border-cyan-400/50' 
//         : 'bg-white/80 border-gray-200/50 hover:bg-white/90 hover:border-blue-500/50'
//     } border rounded-2xl p-6 transition-all duration-500 hover:scale-105`}
//     style={{ animationDelay: `${delay}ms` }}
//   >
//     <div className={`w-12 h-12 rounded-xl ${
//       isDark 
//         ? 'bg-gradient-to-r from-cyan-400 to-purple-500' 
//         : 'bg-gradient-to-r from-blue-500 to-purple-600'
//     } flex items-center justify-center mb-4`}>
//       <Icon size={24} className="text-white" />
//     </div>
//     <h3 className={`text-xl font-bold mb-2 ${
//       isDark ? 'text-white' : 'text-gray-900'
//     }`}>{title}</h3>
//     <p className={`text-sm leading-relaxed ${
//       isDark ? 'text-gray-400' : 'text-gray-600'
//     }`}>{description}</p>
//   </div>
// );

// export default function Welcome({ onContinue }) {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [isDark, setIsDark] = useState(true);

//   useEffect(() => {
//     setTimeout(() => setIsLoaded(true), 500);
//   }, []);

//   const toggleTheme = () => {
//     setIsDark(!isDark);
//   };

//   const features = [
//     {
//       icon: Shield,
//       title: "Secure Registry",
//       description: "Blockchain-powered organ registry with immutable records"
//     },
//     {
//       icon: Users,
//       title: "Donor Verification",
//       description: "AI-driven donor verification and matching system"
//     },
//     {
//       icon: Activity,
//       title: "Real-time Tracking",
//       description: "Live medical data tracking with instant updates"
//     },
//     {
//       icon: Database,
//       title: "Decentralized Storage",
//       description: "Distributed data storage ensuring maximum security"
//     }
//   ];

//   return (
//     <>
//       <style jsx>{`
//         @keyframes rotate {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
        
//         @keyframes reverseRotate {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(-360deg); }
//         }
        
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes glow {
//           0%, 100% { 
//             box-shadow: ${isDark 
//               ? '0 0 20px rgba(6, 182, 212, 0.4)' 
//               : '0 0 20px rgba(59, 130, 246, 0.4)'
//             };
//           }
//           50% { 
//             box-shadow: ${isDark 
//               ? '0 0 40px rgba(6, 182, 212, 0.6), 0 0 60px rgba(147, 51, 234, 0.3)' 
//               : '0 0 40px rgba(59, 130, 246, 0.6), 0 0 60px rgba(147, 51, 234, 0.3)'
//             };
//           }
//         }
        
//         @keyframes pulse-ring {
//           0% {
//             transform: scale(0.8);
//             opacity: 1;
//           }
//           100% {
//             transform: scale(2);
//             opacity: 0;
//           }
//         }
        
//         .animate-fadeInUp {
//           animation: fadeInUp 0.8s ease-out forwards;
//         }
        
//         .animate-glow {
//           animation: glow 3s ease-in-out infinite;
//         }
        
//         .animate-pulse-ring {
//           animation: pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
//         }
//       `}</style>

//       <div className={`relative min-h-screen font-sans overflow-hidden transition-all duration-500 ${
//         isDark 
//           ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white' 
//           : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'
//       }`}>
        
//         {/* Theme Toggle */}
//         <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
        
//         {/* Animated Background */}
//         <div className="absolute inset-0">
//           {/* Grid Pattern */}
//           <div className={`absolute inset-0 ${
//             isDark 
//               ? 'bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)]' 
//               : 'bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)]'
//           } bg-[size:50px_50px]`} />
          
//           {/* Floating Particles */}
//           <FloatingParticles isDark={isDark} />
          
//           {/* Central Glow */}
//           <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse ${
//             isDark 
//               ? 'bg-gradient-to-r from-cyan-400/15 to-purple-600/15' 
//               : 'bg-gradient-to-r from-blue-400/20 to-purple-500/20'
//           }`} />
//         </div>

//         {/* Circular Orbiting Elements */}
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="relative w-full h-full max-w-4xl max-h-4xl">
//             {/* Outer Orbit */}
//             <CircularOrbit radius={250} duration={20}>
//               <IconOrbit icon={Shield} className="animate-pulse" isDark={isDark} />
//             </CircularOrbit>
            
//             {/* Middle Orbit */}
//             <CircularOrbit radius={200} duration={15} reverse>
//               <IconOrbit icon={Database} className="animate-pulse" isDark={isDark} />
//             </CircularOrbit>
            
//             {/* Inner Orbit */}
//             <CircularOrbit radius={150} duration={12}>
//               <IconOrbit icon={Activity} className="animate-pulse" isDark={isDark} />
//             </CircularOrbit>
            
//             {/* Center Pulse Ring */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className={`w-24 h-24 rounded-full border-2 animate-pulse-ring ${
//                 isDark ? 'border-cyan-400/30' : 'border-blue-500/30'
//               }`} />
//               <div className={`absolute w-16 h-16 rounded-full animate-glow ${
//                 isDark 
//                   ? 'bg-gradient-to-r from-cyan-400 to-purple-500' 
//                   : 'bg-gradient-to-r from-blue-500 to-purple-600'
//               }`} />
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
//           <div className={`text-center mb-16 ${isLoaded ? 'animate-fadeInUp' : 'opacity-0'}`}>
//             {/* Logo/Title */}
//             <div className="mb-8">
//               <h1 className="text-7xl sm:text-8xl font-black tracking-tighter mb-4">
//                 <span className={`bg-clip-text text-transparent ${
//                   isDark 
//                     ? 'bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500' 
//                     : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
//                 }`}>
//                   Med
//                 </span>
//                 <span className={`bg-clip-text text-transparent ${
//                   isDark 
//                     ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400' 
//                     : 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600'
//                 }`}>
//                   Ledger
//                 </span>
//               </h1>
//               <div className={`w-32 h-1 mx-auto rounded-full ${
//                 isDark 
//                   ? 'bg-gradient-to-r from-cyan-400 to-purple-500' 
//                   : 'bg-gradient-to-r from-blue-500 to-purple-600'
//               }`} />
//             </div>

//             {/* Subtitle */}
//             <p className={`text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed mb-4 ${
//               isDark ? 'text-gray-300' : 'text-gray-700'
//             }`}>
//               The Future of <span className={`font-semibold ${
//                 isDark ? 'text-cyan-400' : 'text-blue-600'
//               }`}>Decentralized Healthcare</span>
//             </p>
//             <p className={`text-lg max-w-2xl mx-auto mb-12 ${
//               isDark ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Revolutionizing organ registry, donor verification, and medical data tracking through blockchain technology and AI-powered solutions.
//             </p>

//             {/* CTA Button */}
//             <button
//               onClick={onContinue}
//               className={`group relative px-12 py-4 rounded-full text-white font-bold text-lg shadow-2xl transition-all duration-300 hover:scale-110 animate-glow ${
//                 isDark 
//                   ? 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:shadow-cyan-500/25' 
//                   : 'bg-gradient-to-r from-blue-600 to-purple-700 hover:shadow-blue-500/25'
//               }`}
//             >
//               <span className="flex items-baseline gap-3">
//                 Launch Dashboard
//                 <div className="group-hover:translate-x-1 transition-transform">
//                   <Rocket size={20} />
//                 </div>
//               </span>
              
//               {/* Button Glow Effect */}
//               <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl ${
//                 isDark 
//                   ? 'bg-gradient-to-r from-cyan-400 to-purple-500' 
//                   : 'bg-gradient-to-r from-blue-500 to-purple-600'
//               }`} />
//             </button>
//           </div>

//           {/* Feature Cards */}
//           <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl ${isLoaded ? 'animate-fadeInUp' : 'opacity-0'}`}>
//             {features.map((feature, index) => (
//               <FeatureCard
//                 key={index}
//                 icon={feature.icon}
//                 title={feature.title}
//                 description={feature.description}
//                 delay={index * 200}
//                 isDark={isDark}
//               />
//             ))}
//           </div>

//           {/* Scroll Indicator */}
//           <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
//             <div className={`flex flex-col items-center animate-bounce ${
//               isDark ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               <ChevronRight className="rotate-90 mb-2" size={20} />
//               <span className="text-sm">Explore</span>
//             </div>
//           </div>
//         </div>

//         {/* Corner Decorations */}
//         <div className={`absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 ${
//           isDark ? 'border-cyan-400/30' : 'border-blue-500/30'
//         }`} />
//         <div className={`absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 ${
//           isDark ? 'border-purple-500/30' : 'border-purple-600/30'
//         }`} />
//         <div className={`absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 ${
//           isDark ? 'border-purple-500/30' : 'border-purple-600/30'
//         }`} />
//         <div className={`absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 ${
//           isDark ? 'border-cyan-400/30' : 'border-blue-500/30'
//         }`} />
//       </div>
//     </>
//   );
// }
import React, { useState, useEffect } from 'react';
import { Rocket, Shield, Database, Users, Activity, ChevronRight, Moon, Sun } from 'lucide-react';

// Floating Particles Component
const FloatingParticles = ({ isDark }) => {
  const particles = Array.from({ length: 30 }, (_, i) => i);
  
  return (
    <div className="absolute inset-0 overflow-hidden">
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

// Circular Orbit Component
const CircularOrbit = ({ radius, duration, children, reverse = false }) => {
  return (
    <div 
      className="absolute inset-0 flex items-center justify-center"
      style={{
        animation: `${reverse ? 'reverseRotate' : 'rotate'} ${duration}s linear infinite`
      }}
    >
      <div 
        className="relative"
        style={{ width: radius * 2, height: radius * 2 }}
      >
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
          {children}
        </div>
      </div>
    </div>
  );
};

// Icon Orbit Component
const IconOrbit = ({ icon: Icon, className = "", isDark }) => (
  <div className={`w-12 h-12 rounded-full ${
    isDark 
      ? 'bg-gradient-to-r from-cyan-400 to-purple-500' 
      : 'bg-gradient-to-r from-blue-500 to-purple-600'
  } flex items-center justify-center shadow-lg ${className}`}>
    <Icon size={20} className="text-white" />
  </div>
);

// Theme Toggle Component
const ThemeToggle = ({ isDark, toggleTheme }) => (
  <button
    onClick={toggleTheme}
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

// Glowing Card Component
const FeatureCard = ({ icon: Icon, title, description, delay, isDark }) => (
  <div 
    className={`backdrop-blur-md ${
      isDark 
        ? 'bg-gray-900/50 border-gray-800/50 hover:bg-gray-900/70 hover:border-cyan-400/50' 
        : 'bg-white/80 border-gray-200/50 hover:bg-white/90 hover:border-blue-500/50'
    } border rounded-2xl p-6 transition-all duration-500 hover:scale-105`}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className={`w-12 h-12 rounded-xl ${
      isDark 
        ? 'bg-gradient-to-r from-cyan-400 to-purple-500' 
        : 'bg-gradient-to-r from-blue-500 to-purple-600'
    } flex items-center justify-center mb-4`}>
      <Icon size={24} className="text-white" />
    </div>
    <h3 className={`text-xl font-bold mb-2 ${
      isDark ? 'text-white' : 'text-gray-900'
    }`}>{title}</h3>
    <p className={`text-sm leading-relaxed ${
      isDark ? 'text-gray-400' : 'text-gray-600'
    }`}>{description}</p>
  </div>
);

export default function Welcome({ onContinue }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const features = [
    {
      icon: Shield,
      title: "Secure Registry",
      description: "Blockchain-powered organ registry with immutable records"
    },
    {
      icon: Users,
      title: "Donor Verification",
      description: "AI-driven donor verification and matching system"
    },
    {
      icon: Activity,
      title: "Real-time Tracking",
      description: "Live medical data tracking with instant updates"
    },
    {
      icon: Database,
      title: "Decentralized Storage",
      description: "Distributed data storage ensuring maximum security"
    }
  ];

  return (
    <>
      <style jsx>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes reverseRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes glow {
          0%, 100% { 
            box-shadow: ${isDark 
              ? '0 0 20px rgba(6, 182, 212, 0.4)' 
              : '0 0 20px rgba(59, 130, 246, 0.4)'
            };
          }
          50% { 
            box-shadow: ${isDark 
              ? '0 0 40px rgba(6, 182, 212, 0.6), 0 0 60px rgba(147, 51, 234, 0.3)' 
              : '0 0 40px rgba(59, 130, 246, 0.6), 0 0 60px rgba(147, 51, 234, 0.3)'
            };
          }
        }
        
        @keyframes pulse-ring {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        
        .animate-pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
        }
      `}</style>

      <div className={`relative min-h-screen font-sans overflow-hidden transition-all duration-500 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white' 
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'
      }`}>
        
        {/* Theme Toggle */}
        <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
        
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Grid Pattern */}
          <div className={`absolute inset-0 ${
            isDark 
              ? 'bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)]' 
              : 'bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)]'
          } bg-[size:50px_50px]`} />
          
          {/* Floating Particles */}
          <FloatingParticles isDark={isDark} />
          
          {/* Central Glow - moved up to make room for button */}
          <div className={`absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse ${
            isDark 
              ? 'bg-gradient-to-r from-cyan-400/15 to-purple-600/15' 
              : 'bg-gradient-to-r from-blue-400/20 to-purple-500/20'
          }`} />
        </div>

        {/* Circular Orbiting Elements - adjusted positioning */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full max-w-4xl max-h-4xl" style={{ marginTop: '-10vh' }}>
            {/* Outer Orbit */}
            <CircularOrbit radius={280} duration={20}>
              <IconOrbit icon={Shield} className="animate-pulse" isDark={isDark} />
            </CircularOrbit>
            
            {/* Middle Orbit */}
            <CircularOrbit radius={220} duration={15} reverse>
              <IconOrbit icon={Database} className="animate-pulse" isDark={isDark} />
            </CircularOrbit>
            
            {/* Inner Orbit */}
            <CircularOrbit radius={160} duration={12}>
              <IconOrbit icon={Activity} className="animate-pulse" isDark={isDark} />
            </CircularOrbit>
            
            {/* Center Pulse Ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-24 h-24 rounded-full border-2 animate-pulse-ring ${
                isDark ? 'border-cyan-400/30' : 'border-blue-500/30'
              }`} />
              <div className={`absolute w-16 h-16 rounded-full animate-glow ${
                isDark 
                  ? 'bg-gradient-to-r from-cyan-400 to-purple-500' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600'
              }`} />
            </div>
          </div>
        </div>

        {/* Main Content - adjusted layout */}
        <div className="relative z-10 min-h-screen flex flex-col px-6">
          
          {/* Header Section - moved up */}
          <div className={`text-center pt-16 pb-8 ${isLoaded ? 'animate-fadeInUp' : 'opacity-0'}`}>
            {/* Logo/Title */}
            <div className="mb-6">
              <h1 className="text-6xl sm:text-7xl font-black tracking-tighter mb-4">
                <span className={`bg-clip-text text-transparent ${
                  isDark 
                    ? 'bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500' 
                    : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
                }`}>
                  Med
                </span>
                <span className={`bg-clip-text text-transparent ${
                  isDark 
                    ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400' 
                    : 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600'
                }`}>
                  Ledger
                </span>
              </h1>
              <div className={`w-32 h-1 mx-auto rounded-full ${
                isDark 
                  ? 'bg-gradient-to-r from-cyan-400 to-purple-500' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600'
              }`} />
            </div>

            {/* Subtitle */}
            <p className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed mb-3 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              The Future of <span className={`font-semibold ${
                isDark ? 'text-cyan-400' : 'text-blue-600'
              }`}>Decentralized Healthcare</span>
            </p>
            <p className={`text-base max-w-2xl mx-auto mb-8 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Revolutionizing organ registry, donor verification, and medical data tracking through blockchain technology and AI-powered solutions.
            </p>
          </div>

          {/* Spacer to push button down and allow background animation to be visible */}
          <div className="flex-1 min-h-[200px]"></div>

          {/* CTA Button - positioned lower */}
          <div className={`text-center pb-8 ${isLoaded ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <button
              onClick={onContinue}
              className={`group relative px-12 py-4 rounded-full text-white font-bold text-lg shadow-2xl transition-all duration-300 hover:scale-110 animate-glow ${
                isDark 
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:shadow-cyan-500/25' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-700 hover:shadow-blue-500/25'
              }`}
            >
              <span className="flex items-center gap-3">
                Launch Dashboard
                <div className="group-hover:translate-x-1 transition-transform">
                  <Rocket size={20} />
                </div>
              </span>
              
              {/* Button Glow Effect */}
              <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl ${
                isDark 
                  ? 'bg-gradient-to-r from-cyan-400 to-purple-500' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600'
              }`} />
            </button>
          </div>

          {/* Feature Cards - at bottom */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto pb-12 ${isLoaded ? 'animate-fadeInUp' : 'opacity-0'}`}>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 200}
                isDark={isDark}
              />
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="text-center pb-8">
            <div className={`flex flex-col items-center animate-bounce ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <ChevronRight className="rotate-90 mb-2" size={20} />
              <span className="text-sm">Explore</span>
            </div>
          </div>
        </div>

        {/* Corner Decorations */}
        <div className={`absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 ${
          isDark ? 'border-cyan-400/30' : 'border-blue-500/30'
        }`} />
        <div className={`absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 ${
          isDark ? 'border-purple-500/30' : 'border-purple-600/30'
        }`} />
        <div className={`absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 ${
          isDark ? 'border-purple-500/30' : 'border-purple-600/30'
        }`} />
        <div className={`absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 ${
          isDark ? 'border-cyan-400/30' : 'border-blue-500/30'
        }`} />
      </div>
    </>
  );
}