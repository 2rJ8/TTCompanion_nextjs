export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <a className="brand" href="#home" aria-label="Table Top Companion, inicio">
            <img
              className="brand-logo"
              src="/assets/images/App_Icon.svg"
              alt=""
              aria-hidden="true"
            />
            <span className="brand-name">Table Top Companion</span>
          </a>
          <p>
            Tu compañero para descubrir juegos de mesa, organizar partidas y
            compartir tus recomendaciones con la comunidad.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h2>Descubre</h2>
            <a href="#games">Catálogo de juegos</a>
            <a href="#collections">Colecciones</a>
            <a href="#news">Noticias y opiniones</a>
          </div>
          <div>
            <h2>Comunidad</h2>
            <a href="#news">Grupos y eventos</a>
            <a href="#games">Crear una partida</a>
            <a href="#login">Iniciar sesión</a>
          </div>
          <div>
            <h2>Ayuda y legal</h2>
            <a href="#about">Sobre nosotros</a>
            <a href="#contact">Contacto</a>
            <a href="#privacy">Privacidad</a>
            <a href="#cookies">Cookies</a>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 Table Top Companion. Todos los derechos reservados.</span>
        <div>
          <a href="#terms">Términos de uso</a>
          <a href="#accessibility">Accesibilidad</a>
        </div>
      </div>
    </footer>
  );
}
