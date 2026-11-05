import { ArrowUpRight, Heart, MessageCircle } from "lucide-react";
import NewsCard from "./NewsCard";
import RatingStars from "./RatingStars";

export default function NewsSection() {
  return (
    <section className="news-showcase" id="news">
      <div className="container">
        <div className="section-header-row news-header">
          <div>
            <span className="eyebrow">Comunidad en la mesa</span>
            <h2 className="font-display-section">Lo último en la mesa</h2>
            <p>
              Opiniones frescas, partidas memorables y juegos que están dando de
              qué hablar.
            </p>
          </div>
          <a className="button button-outline button-small" href="#games">
            Ver novedades <ArrowUpRight className="icon--sm" aria-hidden="true" />
          </a>
        </div>
        <div className="news-grid">
          <a className="news-quote-card-link" href="#game/sky-team" aria-label="Ver información de Sky Team">
          <article className="news-quote-card">
            <div className="news-quote-top">
              <span className="news-avatar">NM</span>
              <div>
                <strong>Nora M.</strong>
                <span>reseña de la semana</span>
              </div>
              <span className="news-score">9,3</span>
            </div>
            <blockquote>
              “Sky Team hace que cada silencio importe. Nunca había vivido tanta
              tensión con solo doce dados.”
            </blockquote>
            <div className="news-rating">
              <RatingStars count={5} label="5 estrellas de 5" />{" "}
              <small>Experiencia cooperativa</small>
            </div>
            <div className="news-card-footer">
              <span><Heart className="icon--sm" aria-hidden="true" /> 64</span>
              <span><MessageCircle className="icon--sm" aria-hidden="true" /> 12</span>
              <span>Compartir</span>
            </div>
          </article>
          </a>
          <NewsCard
            title="Heat"
            text="La carrera que convierte cada curva en una decisión."
            tag="Más jugado"
          />
          <NewsCard
            title="The White Castle"
            text="Pequeño en mesa, enorme en decisiones y estrategia."
            tag="Recomendado"
          />
        </div>
      </div>
    </section>
  );
}
