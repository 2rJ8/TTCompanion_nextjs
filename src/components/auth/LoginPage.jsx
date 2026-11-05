'use client'

import { useState } from 'react'

export default function LoginPage({ onAuthenticated }) {
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const isRegistering = mode === 'register'

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setMessage('')

    const normalizedEmail = email.trim().toLowerCase()
    const normalizedIdentifier = identifier.trim().toLowerCase()
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: isRegistering ? 'register' : 'login',
          name: name.trim(),
          email: normalizedEmail,
          identifier: normalizedIdentifier,
          password,
        }),
      })
      const result = await response.json()
      if (!response.ok) {
        setError(result.error || 'No se ha podido completar la operación.')
        return
      }
      localStorage.setItem('table-top-user', JSON.stringify(result.user))
      setMessage(isRegistering ? 'Cuenta creada correctamente.' : 'Sesión iniciada correctamente.')
      onAuthenticated(result.user)
    } catch {
      setError('No se ha podido conectar con el servidor.')
    }
  }

  function toggleMode(event) {
    event.preventDefault()
    setMode(isRegistering ? 'login' : 'register')
    setError('')
    setMessage('')
  }

  return (
    <main id="main-content" className="login-container">
      <section className="login-card" aria-labelledby="login-title">
        <span className="eyebrow">Table Top Companion</span>
        <h1 id="login-title">{isRegistering ? 'Crea tu cuenta' : 'Inicia sesión'}</h1>
        <p className="login-intro">
          {isRegistering
            ? 'Guarda tus juegos y participa en la comunidad.'
            : 'Continúa descubriendo juegos y organizando tus partidas.'}
        </p>
        <form className="login-form" onSubmit={handleSubmit}>
          {isRegistering && (
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                required
              />
            </div>
          )}
          {isRegistering ? (
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </div>
          ) : (
            <div className="form-group">
              <label htmlFor="identifier">Nombre o email</label>
              <input
                type="text"
                id="identifier"
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                autoComplete="username"
                placeholder="Tu nombre o correo"
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete={isRegistering ? 'new-password' : 'current-password'}
              minLength="6"
              required
            />
          </div>
          <button type="submit" className="login-button">
            {isRegistering ? 'Crear cuenta' : 'Continuar'}
          </button>
          {error && <p className="login-feedback login-error" role="alert">{error}</p>}
          {message && <p className="login-feedback login-success" role="status">{message}</p>}
          <p className="register-link">
            <a href="#login" onClick={toggleMode}>
              {isRegistering ? 'Ya tengo una cuenta' : '¿No tienes una cuenta? Regístrate'}
            </a>
          </p>
        </form>
        <p className="login-demo-note">
          Cuenta temporal de demostración: los datos se guardan en la base JSON local del proyecto.
        </p>
      </section>
    </main>
  )
}
