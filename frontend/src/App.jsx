// import { useState } from "react";
// import Welcome from "./pages/Welcome";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";

// export default function App() {
//   const [currentView, setCurrentView] = useState("welcome");
//   const [isDark, setIsDark] = useState(true);

//   const handleContinue = () => setCurrentView("login");
//   const handleLoginSuccess = () => setCurrentView("dashboard");
//   const handleBackToHome = () => setCurrentView("welcome");
//   const toggleTheme = () => setIsDark(!isDark);

//   switch (currentView) {
//     case "login":
//       return (
//         <Login 
//           onLoginSuccess={handleLoginSuccess} 
//           onBack={handleBackToHome}
//           isDark={isDark}
//           onToggleTheme={toggleTheme}
//         />
//       );
//     case "dashboard":
//       return (
//         <Dashboard 
//           onBack={handleBackToHome}
//           isDark={isDark}
//           onToggleTheme={toggleTheme}
//         />
//       );
//     case "welcome":
//     default:
//       return (
//         <Welcome 
//           onContinue={handleContinue}
//           isDark={isDark}
//           onToggleTheme={toggleTheme}
//         />
//       );
//   }
// }
import { useState } from "react";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RegisterBatch from "./pages/RegisterBatch";
import RegisterOrgan from "./pages/RegisterOrgan";
import DonorLookup from "./pages/DonorLookup";
import ConsentVerify from "./pages/ConsentVerify";
import ScanVerify from "./pages/ScanVerify";
import MedicineLookup from "./pages/MedicineLookup";
import ScanQR from "./pages/ScanQR";
import StatsDashboard from './components/StatsDashboard';

export default function App() {
  const [currentView, setCurrentView] = useState("welcome");
  const [isDark, setIsDark] = useState(true);

  const handleContinue = () => setCurrentView("login");
  const handleLoginSuccess = () => setCurrentView("dashboard");
  const handleBackToHome = () => setCurrentView("welcome");
  const toggleTheme = () => setIsDark(!isDark);

  const commonProps = {
    isDark,
    onToggleTheme: toggleTheme,
    onBack: handleBackToHome,
  };

const renderView = () => {
  switch (currentView) {
    case "login":
      return <Login onLoginSuccess={handleLoginSuccess} {...commonProps} />;
    case "dashboard":
      return <Dashboard setCurrentView={setCurrentView} {...commonProps} />;
    case "register-medicine":
      return <RegisterBatch {...commonProps} />;
    case "register-organ":
      return <RegisterOrgan {...commonProps} />;
    case "lookup-donor":
      return <DonorLookup {...commonProps} />;
    case "verify-consent":
      return <ConsentVerify {...commonProps} />;
    case "verify-cid":
      return <ScanVerify {...commonProps} />;
    case "lookup-medicine":
      return <MedicineLookup {...commonProps} />;
    case "scan-qr":
      return <ScanQR {...commonProps} />;
    case "stats":
      return <StatsDashboard {...commonProps} />;
    case "welcome":
    default:
      return <Welcome onContinue={handleContinue} {...commonProps} />;
  }
};

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
        {renderView()}
      </div>
    </div>
  );
}
