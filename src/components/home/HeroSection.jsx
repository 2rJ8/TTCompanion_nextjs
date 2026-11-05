import { ArrowRight, Bookmark, Heart } from "lucide-react";
import { games } from "../../data/games";
import reviews from "../../data/reviews.json";

export default function HeroSection({ gameName }) {
  const game = games.find(
    (item) =>
      item.slug.toLowerCase() === gameName.toLowerCase() ||
      item.name.toLowerCase() === gameName.toLowerCase(),
  );
  const featuredReview = reviews.find((review) => review.game === game?.slug);

  if (!game) {
    return (
      <section className="hero" aria-labelledby="hero-error-title">
        <div className="container">
          <div className="hero-content">
            <h1 id="hero-error-title" className="font-display-cover">
              Juego destacado no disponible
            </h1>
            <p className="hero-description">
              No hemos encontrado el juego seleccionado. Explora el catálogo
              para elegir otro.
            </p>
            <a className="button button-primary button-large" href="#games">
              Explorar juegos <ArrowRight className="icon--sm" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <section className="hero-content" aria-labelledby="hero-title">
          <span className="eyebrow hero-eyebrow">Juego de la semana</span>
          <h1 id="hero-title" className="font-display-cover">
            {game.name}: {game.description}
          </h1>
          <p className="hero-description">{game.longDescription}</p>
          <div className="game-tags">
            <span>{game.category}</span>
            <span>{game.players}</span>
            <span>{game.time}</span>
          </div>
          <div className="hero-actions">
            <a className="button button-primary button-large" href={`#game/${game.slug}`}>
              <ArrowRight className="icon--sm" aria-hidden="true" /> Ver juego
            </a>
            <a className="button button-outline button-large" href="#collections">
              <Bookmark className="icon--sm" aria-hidden="true" /> Guardar
            </a>
          </div>
        </section>
        <a
          className="hero-card-link"
          href={`#game/${game.slug}`}
          aria-label={`Ver información de ${game.name}`}
        >
          <article className="hero-card">
            <div className="game-card-image">
              <img
                src="/assets/images/generic-board-game.svg"
                alt={`Ilustración de ${game.name}`}
              />
              <div className="game-score">
                <strong>{game.rating}</strong>
                <span>Comunidad</span>
              </div>
              {featuredReview && (
                <div className="game-review">
                  <span className="review-avatar">{featuredReview.initials}</span>
                  <div className="review-copy">
                    <strong>«{featuredReview.title}»</strong>
                    <span>{featuredReview.user} · {featuredReview.date}</span>
                  </div>
                  <span className="review-likes">
                    <Heart className="icon--sm" aria-hidden="true" /> {featuredReview.likes}
                  </span>
                </div>
              )}
            </div>
          </article>
        </a>
      </div>
    </section>
  );
}
