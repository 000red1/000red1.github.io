import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Obfuscated base endpoint
const _e = "aHR0cHM6Ly9ibGFjay1iYXNlLTU1YjQuam9objItMHplcm8ud29ya2Vycy5kZXY=";
const getBaseUrl = () => atob(_e);

export default function Secret() {
  const navigate = useNavigate();

  useEffect(() => {
    // Log the visit attempt, then redirect
    const logAndRedirect = async () => {
      try {
        await fetch(`${getBaseUrl()}/visit`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });
      } catch {
        // Ignore errors - still redirect
      }
      navigate("/", { replace: true });
    };

    logAndRedirect();
  }, [navigate]);

  // Show nothing while redirecting
  return null;
}
