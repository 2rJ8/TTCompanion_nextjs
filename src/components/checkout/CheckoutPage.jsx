'use client'

import { ArrowLeft, Coffee, LockKeyhole } from 'lucide-react'

export default function CheckoutPage() {
  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <main id="main-content" className="checkout-page">
      <div className="container checkout-layout">
        <nav className="checkout-back" aria-label="Migas de pan">
          <a href="#home">
            <ArrowLeft className="icon--sm" aria-hidden="true" /> Volver al inicio
          </a>
        </nav>
        <section className="checkout-card" aria-labelledby="checkout-title">
          <div className="checkout-heading">
            <span className="coffee-icon" aria-hidden="true">
              <Coffee className="icon--md" />
            </span>
            <div>
              <span className="eyebrow">Apoya el proyecto</span>
              <h1 id="checkout-title">Cómprame un café</h1>
              <p>Tu apoyo ayuda a mantener Table Top Companion.</p>
            </div>
          </div>
          <div className="checkout-summary">
            <span>Café para el equipo</span>
            <strong>3,00 €</strong>
          </div>
          <form className="checkout-form" onSubmit={handleSubmit}>
            <fieldset>
              <legend>Datos de contacto</legend>
              <label htmlFor="checkout-name">Nombre</label>
              <input id="checkout-name" type="text" autoComplete="name" required />
              <label htmlFor="checkout-email">Correo electrónico</label>
              <input id="checkout-email" type="email" autoComplete="email" required />
            </fieldset>
            <fieldset>
              <legend>Datos de pago</legend>
              <label htmlFor="card-number">Número de tarjeta</label>
              <input id="card-number" type="text" inputMode="numeric" placeholder="0000 0000 0000 0000" autoComplete="cc-number" required />
              <div className="checkout-fields-row">
                <div>
                  <label htmlFor="card-expiry">Caducidad</label>
                  <input id="card-expiry" type="text" placeholder="MM/AA" autoComplete="cc-exp" required />
                </div>
                <div>
                  <label htmlFor="card-cvc">CVC</label>
                  <input id="card-cvc" type="text" inputMode="numeric" placeholder="123" autoComplete="cc-csc" required />
                </div>
              </div>
            </fieldset>
            <button className="button button-primary checkout-submit" type="submit">
              <LockKeyhole className="icon--sm" aria-hidden="true" /> Pagar 3,00 €
            </button>
            <p className="checkout-note">Formulario de demostración. No se realizará ningún cargo.</p>
          </form>
        </section>
      </div>
    </main>
  )
}
