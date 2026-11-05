export default function GameCard({ game }) {
  return (
    <article className="catalog-card">
      <a className="catalog-card-link" href={`#game/${game.slug}`} aria-label={`Ver información de ${game.name}`}>
      <div className="catalog-cover">
        <img
          src="/assets/images/generic-board-game.svg"
          alt={`Ilustración de ${game.name}`}
        />
        <span className="catalog-badge">{game.badge}</span>
        <span className="catalog-rating">{game.rating}</span>
      </div>
      <div className="catalog-content">
        <div className="catalog-card-top">
          <h3>{game.name}</h3>
          <span>{game.players}</span>
        </div>
        <p>{game.description}</p>
        <div className="catalog-meta">
          <span>{game.category}</span>
          <strong>{game.time}</strong>
        </div>
      </div>
      </a>
    </article>
  );
}
