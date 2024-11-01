import { useEffect, useState } from "react";

const useNetworkStatus = () => {
  const [isOnline, setOnline] = useState(navigator.onLine); // Initialize with navigator.onLine

  const updateNetworkStatus = () => {
    setOnline(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);

    return () => {
      window.removeEventListener("online", updateNetworkStatus);
      window.removeEventListener("offline", updateNetworkStatus);
    };
  }, []); // No dependencies needed

  return { isOnline };
};

export default useNetworkStatus;
