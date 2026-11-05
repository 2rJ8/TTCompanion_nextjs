import { ArrowLeft, Bookmark, Clock3, Users, Star, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { games } from "../../data/games";
import reviews from "../../data/reviews.json";

export default function GameDetailPage({ slug, user }) {
  const game = games.find((item) => item.slug === slug);
  const [gameReviews, setGameReviews] = useState(() => reviews.filter((review) => review.game === slug));
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);

  useEffect(() => {
    fetch(`/api/reviews?game=${encodeURIComponent(slug)}`)
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("No se pudieron cargar las reseñas.")))
      .then(setGameReviews)
      .catch((error) => console.error(error))
  }, [slug]);

  if (!game) {
    return (
      <main id="main-content" className="game-detail-page">
        <div className="container detail-not-found">
          <p className="eyebrow">Catálogo</p>
          <h1 className="font-display-title">No hemos encontrado ese juego</h1>
          <a className="button button-primary" href="#games">
            Volver al catálogo
          </a>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="game-detail-page">
      <div className="container">
        <nav className="breadcrumb detail-breadcrumb">
          <a href="#games">
            <ArrowLeft className="icon--sm" aria-hidden="true" /> Volver a juegos
          </a>
          <span>/</span>
          <strong>{game.name}</strong>
        </nav>
        <section className="game-detail-hero">
          <div className="detail-cover">
            <img src="/assets/images/generic-board-game.svg" alt={`Ilustración de ${game.name}`} />
            <span className="catalog-badge">{game.badge}</span>
          </div>
          <div className="detail-summary">
            <span className="eyebrow">{game.category}</span>
            <h1 className="font-display-title">{game.name}</h1>
            <p className="detail-lead">{game.description}</p>
            <div className="detail-rating">
              <Star className="icon--sm" aria-hidden="true" />
              <strong>{game.rating}</strong>
              <span>valoración de la comunidad</span>
            </div>
            <div className="detail-actions">
              <button className="button button-primary" type="button">
                <Bookmark className="icon--sm" aria-hidden="true" /> Guardar juego
              </button>
              <a className="button button-outline" href="#games">Explorar más juegos</a>
            </div>
          </div>
        </section>
        <section className="detail-content-grid">
          <div className="detail-description">
            <span className="eyebrow">Sobre el juego</span>
            <h2 className="font-display-section">Una partida, muchas historias</h2>
            <p>{game.longDescription}</p>
            <h3>Lo que encontrarás</h3>
            <ul className="detail-highlights">
              {game.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
            </ul>
          </div>
          <aside className="detail-facts">
            <h2>Ficha del juego</h2>
            <Fact icon={<Users className="icon--sm" />} label="Jugadores" value={game.players} />
            <Fact icon={<Clock3 className="icon--sm" />} label="Duración" value={game.time} />
            <Fact label="Complejidad" value={game.complexity} />
            <Fact label="Año de publicación" value={game.year} />
            <Fact label="Diseño" value={game.designer} />
            <div className="detail-mechanics">
              <span>Mecánicas</span>
              <div>{game.mechanics.map((mechanic) => <span key={mechanic}>{mechanic}</span>)}</div>
            </div>
          </aside>
        </section>
        <ReviewsSection
          game={game}
          reviews={gameReviews}
          user={user}
          onOpenForm={() => setIsReviewFormOpen(true)}
        />
        {isReviewFormOpen && (
          <ReviewModal
            game={game}
            user={user}
            onClose={() => setIsReviewFormOpen(false)}
            onCreated={(review) => {
              setGameReviews((current) => [...current, review])
              setIsReviewFormOpen(false)
            }}
          />
        )}
      </div>
    </main>
  );
}

function ReviewsSection({ game, reviews: gameReviews, user, onOpenForm }) {
  return (
    <section className="game-reviews" aria-labelledby="reviews-title">
      <div className="reviews-heading">
        <div>
          <span className="eyebrow">Opiniones de la comunidad</span>
          <h2 id="reviews-title" className="font-display-section">
            Reseñas de {game.name}
          </h2>
        </div>
        <div className="reviews-heading-actions">
          <span className="reviews-count" aria-live="polite">
            {gameReviews.length} {gameReviews.length === 1 ? "reseña" : "reseñas"}
          </span>
          {user ? (
            <button className="button button-primary button-small" type="button" onClick={onOpenForm}>
              Escribir reseña
            </button>
          ) : (
            <a className="button button-outline button-small" href="#login">
              Inicia sesión para reseñar
            </a>
          )}
        </div>
      </div>
      <div className="reviews-list">
        {gameReviews.map((review) => (
          <article className="user-review" key={review.id}>
            <header className="user-review-header">
              <span className="user-review-avatar" aria-hidden="true">
                {review.initials}
              </span>
              <div>
                <strong>{review.user}</strong>
                <span>{review.date}</span>
              </div>
              <span className="user-review-score">
                <Star className="icon--sm" fill="currentColor" aria-hidden="true" />
                {review.rating}
              </span>
            </header>
            <h3>{review.title}</h3>
            <p>{review.comment}</p>
            <footer className="user-review-footer">
              <span>♡ {review.likes}</span>
              <span>Valoración verificada de la comunidad</span>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}

function ReviewModal({ game, user, onClose, onCreated }) {
  const [rating, setRating] = useState(8)
  const [title, setTitle] = useState("")
  const [comment, setComment] = useState("")
  const [error, setError] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    closeButtonRef.current?.focus()
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  async function handleSubmit(event) {
    event.preventDefault()
    setError("")
    setIsSaving(true)
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ game: game.slug, user: user.name, rating, title, comment }),
      })
      const result = await response.json()
      if (!response.ok) {
        setError(result.error || "No se ha podido guardar la reseña.")
        return
      }
      onCreated(result)
    } catch {
      setError("No se ha podido conectar con el servidor.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="review-modal-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section className="review-modal" role="dialog" aria-modal="true" aria-labelledby="review-modal-title">
        <button ref={closeButtonRef} className="review-modal-close" type="button" onClick={onClose} aria-label="Cerrar formulario">
          <X className="icon--md" aria-hidden="true" />
        </button>
        <span className="eyebrow">Opinión de la comunidad</span>
        <h2 id="review-modal-title">Reseña de {game.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="review-form-rating">
            <label htmlFor="review-rating">Puntuación</label>
            <select id="review-rating" value={rating} onChange={(event) => setRating(Number(event.target.value))}>
              {Array.from({ length: 10 }, (_, index) => index + 1).map((value) => (
                <option key={value} value={value}>{value}/10</option>
              ))}
            </select>
          </div>
          <label htmlFor="review-title">Título</label>
          <input id="review-title" value={title} onChange={(event) => setTitle(event.target.value)} maxLength="100" required />
          <label htmlFor="review-comment">Tu opinión</label>
          <textarea id="review-comment" value={comment} onChange={(event) => setComment(event.target.value)} maxLength="1000" rows="5" required />
          {error && <p className="login-feedback login-error" role="alert">{error}</p>}
          <button className="button button-primary" type="submit" disabled={isSaving}>
            {isSaving ? "Guardando..." : "Publicar reseña"}
          </button>
        </form>
      </section>
    </div>
  )
}

function Fact({ icon, label, value }) {
  return (
    <div className="detail-fact">
      {icon}
      <div><span>{label}</span><strong>{value}</strong></div>
    </div>
  );
}
