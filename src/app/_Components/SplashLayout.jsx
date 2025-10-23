"use client";
import { useEffect, useState } from "react";

export default function SplashLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (hasVisited) {
      setLoading(false);
    } else {
      const fadeTimer = setTimeout(() => setFadeOut(true), 2500);

      const hideTimer = setTimeout(() => {
        setLoading(false);
        localStorage.setItem("hasVisited", "true");
      }, 3000);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  return (
    <>
      {loading && (
        <div
          className={`fixed  top-0 left-0 w-screen h-screen flex items-center justify-center bg-[#101828] z-[9999] transition-opacity duration-700 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <video
            playsInline
            muted
            autoPlay
            src="/images/e-commerce-logo.mp4"
          ></video>
        </div>
      )}

      {/* محتوى الموقع */}
      <div
        className={`transition-opacity duration-75 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </>
  );
}
