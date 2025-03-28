import { usePWAInstall } from "@/hooks/usePWAInstall";
import { useEffect } from "react";

const PWAInstallToast = () => {
  console.log("showInstallPrompt");
  const { showInstallPrompt, installApp, setShowInstallPrompt } =
    usePWAInstall();

  useEffect(() => {
    if (showInstallPrompt) {
      setTimeout(() => setShowInstallPrompt(false), 10000); // Auto-hide after 10s
    }
  }, [showInstallPrompt]);

  if (!showInstallPrompt) return null;

  return (
    <div
      className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white 
                    px-4 py-2 rounded-lg shadow-lg flex items-center gap-3"
    >
      <p>Install Saya Farmuda for a better experience!</p>
      <button
        onClick={installApp}
        className="bg-white text-blue-600 px-2 py-1 rounded-lg font-semibold"
      >
        Install
      </button>
    </div>
  );
};

export default PWAInstallToast;
