"use client";

import { useEffect } from "react";
import { getIdToken, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Make sure path is correct

export default function RefreshTokenHandler() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const setupAutoRefresh = (user: any) => {
      const refreshIdToken = async () => {
        try {
          const token = await getIdToken(user, true); 
          const res = await fetch(`${baseUrl}/auth/refresh-token`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({}),
          });

          if (!res.ok) throw new Error("Refresh failed");
          console.log(" Firebase token refreshed and sent to server");
        } catch (err) {
          console.error(" Token refresh error:", err);
        }
      };

      refreshIdToken(); // Initial refresh
      interval = setInterval(refreshIdToken, 55 * 60 * 1000); // Refresh every 55 minutes
      window.addEventListener("focus", refreshIdToken); // Refresh on tab focus
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setupAutoRefresh(user);
      } else {
        // Clear interval and listener if user logs out
        if (interval) clearInterval(interval);
        window.removeEventListener("focus", setupAutoRefresh);
      }
    });

    return () => {
      unsubscribe();
      if (interval) clearInterval(interval);
      window.removeEventListener("focus", setupAutoRefresh);
    };
  }, []);

  return null;
}
