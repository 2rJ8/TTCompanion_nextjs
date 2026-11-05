import { Heart, MessageCircle } from "lucide-react";

export default function NewsCard({ title, text, tag }) {
  const slug = title.toLowerCase().replaceAll(" ", "-");

  return (
    <a className="news-card-link" href={`#game/${slug}`} aria-label={`Ver información de ${title}`}>
    <article className="news-card">
      <div className="news-image news-image-heat">
        <img
          src="/assets/images/generic-board-game.svg"
          alt={`Partida de ${title}`}
        />
        <span className="news-tag">{tag}</span>
      </div>
      <div className="news-card-content">
        <div className="news-card-meta">
          <span>{title}</span>
          <span>hace 2 h</span>
        </div>
        <p>{text}</p>
        <div className="news-card-footer">
          <span><MessageCircle className="icon--sm" aria-hidden="true" /> 28</span>
          <span><Heart className="icon--sm" aria-hidden="true" /> 47</span>
          <span>Leer más</span>
        </div>
      </div>
    </article>
    </a>
  );
}
