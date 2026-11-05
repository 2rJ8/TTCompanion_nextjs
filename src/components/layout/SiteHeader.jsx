 'use client'

import { Coffee, Menu, Moon, Settings, Sun, UserRound, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function SiteHeader({ theme, user, onLogout, onThemeChange }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape" && isMobileNavOpen) {
        setIsMobileNavOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileNavOpen]);

  return (
    <>
      <a className="skip-link" href="#main-content">Saltar al contenido principal</a>
      <header className="site-header">
      <div className="container header-inner">
        <a
          className="brand"
          href="#home"
          aria-label="Table Top Companion, inicio"
        >
          <img
            className="brand-logo"
            src="/assets/images/App_Icon.svg"
            alt=""
            aria-hidden="true"
          />
          <span className="brand-name">Table Top Companion</span>
        </a>
        <nav
          id="mobile-navigation"
          className={`main-nav${isMobileNavOpen ? " is-open" : ""}`}
          aria-label="Navegación principal"
        >
          <NavGroup
            title="Explorar"
            onNavigate={() => setIsMobileNavOpen(false)}
            links={[
              ["#games", "Juegos"],
              ["#collections", "Colecciones"],
              ["#news", "Noticias y opiniones"],
            ]}
          />
          <NavGroup
            title="Partidas"
            onNavigate={() => setIsMobileNavOpen(false)}
            links={[
              ["#games", "Mis partidas"],
              ["#games", "Crear partida"],
            ]}
          />
          <NavGroup
            title="Comunidad"
            onNavigate={() => setIsMobileNavOpen(false)}
            links={[
              ["#news", "Grupos"],
              ["#news", "Eventos"],
            ]}
          />
        </nav>
        <button
          className="mobile-nav-toggle"
          type="button"
          aria-expanded={isMobileNavOpen}
          aria-controls="mobile-navigation"
          aria-label={isMobileNavOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setIsMobileNavOpen((current) => !current)}
        >
          {isMobileNavOpen ? (
            <X className="icon--md" aria-hidden="true" />
          ) : (
            <Menu className="icon--md" aria-hidden="true" />
          )}
        </button>
        <div className="header-actions">
          <a className="coffee-support-link" href="#checkout">
            <Coffee className="icon--sm" aria-hidden="true" /> Invítame a un café
          </a>
          <button
            className="header-icon-button theme-toggle"
            type="button"
            onClick={onThemeChange}
            aria-pressed={theme === "dark"}
            aria-label="Cambiar tema"
          >
            {theme === "dark" ? <Sun className="icon--md" aria-hidden="true" /> : <Moon className="icon--md" aria-hidden="true" />}
          </button>
          <a
            className="header-icon-button"
            href="#config"
            aria-label="Configuración"
          >
            <Settings className="icon--md" aria-hidden="true" />
          </a>
          {user ? (
            <div className="user-session">
              <span className="user-session-name" title={user.email}>{user.name}</span>
              <button className="header-icon-button user-button" type="button" onClick={() => {
                if (window.confirm("¿Seguro que quieres cerrar sesión?")) {
                  onLogout()
                }
              }} aria-label="Cerrar sesión">
                <UserRound className="icon--md" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <a className="header-icon-button user-button" href="#login" aria-label="Iniciar sesión">
              <UserRound className="icon--md" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
      </header>
    </>
  );
}

function NavGroup({ title, links, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef(null)

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  return (
    <div className="nav-dropdown">
      <button
        ref={triggerRef}
        className="nav-trigger"
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setIsOpen((current) => !current)}
      >
        {title}
      </button>
      <div className="dropdown-menu" hidden={!isOpen}>
        {links.map(([href, label]) => (
          <a
            href={href}
            key={label}
            onClick={() => {
              setIsOpen(false);
              onNavigate();
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
