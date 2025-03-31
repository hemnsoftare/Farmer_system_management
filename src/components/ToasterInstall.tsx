"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowToast(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const installApp = () => {
    if (deferredPrompt) {
      (deferredPrompt as any).prompt();
      (deferredPrompt as any).userChoice.then(() => setShowToast(false));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to Saya Farmuda</h1>

      {showToast && (
        <div className="fixed bottom-4 left-4 bg-blue-600 text-white p-3 rounded-lg shadow-lg">
          <p>Install our app for a better experience!</p>
          <button
            onClick={installApp}
            className="mt-2 px-3 py-1 bg-white text-blue-600 rounded"
          >
            Install
          </button>
        </div>
      )}
    </div>
  );
}
