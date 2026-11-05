"use client";

import { Bookmark, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { games } from "../../data/games";
import GameCard from "./GameCard";
import GameFilters from "./GameFilters";

export default function GamesPage() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState([]);
  const databaseGameCount = games.length;
  const visibleGames = useMemo(
    () =>
      games.filter(
        (game) =>
          (!filters.length || filters.includes(game.category)) &&
          game.search.includes(query.trim().toLocaleLowerCase("es")),
      ),
    [query, filters],
  );
  const toggleFilter = (category) =>
    setFilters((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  return (
    <main id="main-content">
      <section className="games-hero">
        <div className="container">
          <nav className="breadcrumb">
            <a href="#home">Explorar</a>
            <span>/</span>
            <strong>Juegos de mesa</strong>
          </nav>
          <div className="hero-title-row">
            <div>
              <span className="eyebrow">Catálogo de la comunidad</span>
              <h1 className="font-display-title">Explora juegos de mesa</h1>
            </div>
            <button className="saved-link" type="button">
              <Bookmark className="icon--sm" aria-hidden="true" /> Mis juegos
              guardados
            </button>
          </div>
          <p className="games-intro">
            Encuentra tu próxima partida por nombre, mecánica o lo que te
            apetezca jugar.
          </p>
          <form
            className="game-search"
            role="search"
            onSubmit={(event) => event.preventDefault()}
          >
            <Search className="icon--md" aria-hidden="true" />
            <label className="sr-only" htmlFor="game-query">
              Buscar juegos
            </label>
            <input
              id="game-query"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Busca por nombre: Arcs, Azul, Root..."
            />
            <button className="button button-primary" type="submit">
              Buscar juegos
            </button>
          </form>
        </div>
      </section>
      <section className="catalog-section">
        <div className="container">
          <div className="catalog-heading">
            <div>
              <span className="eyebrow">Catálogo completo</span>
              <h2 className="font-display-section" aria-live="polite">
                {visibleGames.length}{" "}
                {visibleGames.length === 1 ? "juego" : "juegos"}
              </h2>
            </div>
            <span className="results-count">
              {databaseGameCount} juegos en la estantería
            </span>
          </div>
          <div className="catalog-layout">
            <GameFilters
              selected={filters}
              onToggle={toggleFilter}
              onReset={() => setFilters([])}
            />
            <div className="game-results">
              {visibleGames.map((game) => (
                <GameCard game={game} key={game.name} />
              ))}
              {!visibleGames.length && (
                <p className="empty-results">
                  No hay juegos que coincidan con tu búsqueda.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
