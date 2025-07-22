"use client";

import { useEffect } from "react";

export default function RefreshTokenHandler() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
//   useEffect(() => {
//     const refreshIdToken = async () => {
//       try {
//         const res = await fetch(`${baseUrl}/auth/refresh-token`, {
//           method: "POST",
//           credentials: "include",
//         });
//         if (!res.ok) throw new Error("Refresh failed");
//         console.log(" Token refreshed");
//       } catch (err) {
//         console.error(" Token refresh error:");
//       }
//     };

//     refreshIdToken(); // Initial call
//     const interval = setInterval(refreshIdToken, 55 * 60 * 1000); // Every 55 minutes
//     window.addEventListener("focus", refreshIdToken); // Optional: on tab focus

//     return () => {
//       clearInterval(interval);
//       window.removeEventListener("focus", refreshIdToken);
//     };
//   }, []);

  return null;
}
