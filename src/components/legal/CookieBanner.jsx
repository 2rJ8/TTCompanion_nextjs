"use client";

import { Cookie, Settings2, X } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "table-top-cookie-consent";
const CONSENT_MAX_AGE = 24 * 60 * 60 * 1000 * 30 * 24;

const defaultPreferences = {
  necessary: true,
  analytics: false,
  personalization: false,
  advertising: false,
};

function getStoredConsent() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!value || !value.savedAt) return null;
    if (Date.now() - value.savedAt > CONSENT_MAX_AGE) return null;
    return value.preferences;
  } catch {
    return null;
  }
}

export default function CookieBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [preferences, setPreferences] = useState(defaultPreferences);

  useEffect(() => {
    if (!getStoredConsent()) {
      setIsOpen(true);
    }

    function openPreferences() {
      const stored = getStoredConsent();
      setPreferences(stored || defaultPreferences);
      setIsConfiguring(true);
      setIsOpen(true);
    }

    function handleHashChange() {
      if (window.location.hash === "#cookies") openPreferences();
    }

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("open-cookie-preferences", openPreferences);
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("open-cookie-preferences", openPreferences);
    };
  }, []);

  function savePreferences(nextPreferences) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        savedAt: Date.now(),
        preferences: { ...nextPreferences, necessary: true },
      }),
    );
    setPreferences(nextPreferences);
    setIsOpen(false);
    setIsConfiguring(false);
  }

  function togglePreference(name) {
    setPreferences((current) => ({
      ...current,
      [name]: !current[name],
    }));
  }

  if (!isOpen) return null;

  return (
    <aside
      className={`cookie-banner${isConfiguring ? " is-configuring" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
    >
      {isConfiguring ? (
        <div className="cookie-dialog">
          <div className="cookie-dialog-header">
            <div className="cookie-dialog-title">
              <Settings2 className="icon--md" aria-hidden="true" />
              <h2 id="cookie-banner-title">Preferencias de cookies</h2>
            </div>
            <button
              className="cookie-close"
              type="button"
              onClick={() => {
                setIsConfiguring(false);
                setIsOpen(false);
              }}
              aria-label="Cerrar preferencias"
            >
              <X className="icon--sm" aria-hidden="true" />
            </button>
          </div>
          <p id="cookie-banner-description">
            Elige qué tecnologías no necesarias quieres permitir. Puedes
            cambiar esta selección en cualquier momento desde el pie de página.
          </p>

          <div className="cookie-options">
            <label className="cookie-option">
              <span>
                <strong>Necesarias</strong>
                <small>Funcionamiento básico y preferencias esenciales.</small>
              </span>
              <input type="checkbox" checked disabled />
            </label>
            <label className="cookie-option">
              <span>
                <strong>Analítica</strong>
                <small>Medición anónima del uso y rendimiento.</small>
              </span>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={() => togglePreference("analytics")}
              />
            </label>
            <label className="cookie-option">
              <span>
                <strong>Personalización</strong>
                <small>Contenido adaptado a tus preferencias.</small>
              </span>
              <input
                type="checkbox"
                checked={preferences.personalization}
                onChange={() => togglePreference("personalization")}
              />
            </label>
            <label className="cookie-option">
              <span>
                <strong>Publicidad</strong>
                <small>Medición y personalización de anuncios.</small>
              </span>
              <input
                type="checkbox"
                checked={preferences.advertising}
                onChange={() => togglePreference("advertising")}
              />
            </label>
          </div>

          <div className="cookie-actions cookie-actions-config">
            <button
              className="cookie-button cookie-button-secondary"
              type="button"
              onClick={() => savePreferences(defaultPreferences)}
            >
              Rechazar todas
            </button>
            <button
              className="cookie-button cookie-button-primary"
              type="button"
              onClick={() => savePreferences(preferences)}
            >
              Guardar preferencias
            </button>
          </div>
        </div>
      ) : (
        <div className="cookie-banner-content">
          <div className="cookie-banner-icon" aria-hidden="true">
            <Cookie className="icon--md" />
          </div>
          <div className="cookie-banner-copy">
            <h2 id="cookie-banner-title">Configuración de cookies</h2>
            <p id="cookie-banner-description">
              Usamos cookies propias y, si los autorizas, tecnologías de terceros
              para mejorar tu experiencia y medir el uso del sitio.
            </p>
            <a href="#cookies" onClick={() => setIsConfiguring(true)}>
              Más información en nuestra política de cookies
            </a>
          </div>
          <div className="cookie-actions">
            <button
              className="cookie-button cookie-button-secondary"
              type="button"
              onClick={() => savePreferences(defaultPreferences)}
            >
              Rechazar
            </button>
            <button
              className="cookie-button cookie-button-secondary"
              type="button"
              onClick={() => setIsConfiguring(true)}
            >
              Configurar
            </button>
            <button
              className="cookie-button cookie-button-primary"
              type="button"
              onClick={() =>
                savePreferences({
                  necessary: true,
                  analytics: true,
                  personalization: true,
                  advertising: true,
                })
              }
            >
              Aceptar todas
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
