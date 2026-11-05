"use client";

import { useEffect, useState } from "react";
import SiteHeader from "./layout/SiteHeader";
import HomePage from "./home/HomePage";
import GamesPage from "./catalog/GamesPage";
import GameDetailPage from "./catalog/GameDetailPage";
import LoginPage from "./auth/LoginPage";
import CheckoutPage from "./checkout/CheckoutPage";

export default function TableTopApp() {
  const [route, setRoute] = useState("#home");
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);
  useEffect(() => {
    setRoute(window.location.hash || "#home");
    setTheme(localStorage.getItem("table-top-theme") || "light");
    const storedUser = localStorage.getItem("table-top-user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("table-top-user");
      }
    }
  }, []);
  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || "#home");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  useEffect(() => {
    document.body.className =
      theme === "dark" ? "theme-after-game" : "theme-daylight";
    localStorage.setItem("table-top-theme", theme);
  }, [theme]);
  const detailMatch = route.match(/^#game\/([^/]+)$/);
  function handleAuthenticated(nextUser) {
    setUser(nextUser);
    window.location.hash = "#home";
  }

  function handleLogout() {
    localStorage.removeItem("table-top-user");
    setUser(null);
    window.location.hash = "#home";
  }

  const page = detailMatch ? (
    <GameDetailPage slug={detailMatch[1]} user={user} />
  ) : route === "#games" ? (
    <GamesPage />
  ) : route === "#login" ? (
    <LoginPage onAuthenticated={handleAuthenticated} />
  ) : route === "#checkout" ? (
    <CheckoutPage />
  ) : (
    <HomePage />
  );
  return (
    <>
      <SiteHeader
        theme={theme}
        user={user}
        onLogout={handleLogout}
        onThemeChange={() =>
          setTheme((current) => (current === "dark" ? "light" : "dark"))
        }
      />
      {page}
    </>
  );
}
