export default function CollectionCard({ collection }) {
  const [title, initials, author, count] = collection;
  return (
    <article className="collection-card">
      <div className="collection-collage">
        <img src="/assets/images/generic-board-game.svg" alt="" />
        <img src="/assets/images/generic-board-game.svg" alt="" />
        <img src="/assets/images/generic-board-game.svg" alt="" />
      </div>
      <div className="collection-card-content">
        <h3>{title}</h3>
        <div className="collection-meta">
          <span className="collection-author">
            <span className="collection-avatar">{initials}</span> por {author}
          </span>
          <strong>{count} juegos</strong>
        </div>
      </div>
    </article>
  );
}
