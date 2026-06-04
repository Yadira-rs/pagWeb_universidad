function Footer() {
  return (
    <footer className="footer">
      <div className="footer-tagline">
        <div className="footer-tagline-logo">
          <img src="/imagenes/logo_ujed.png" alt="UJED" />
        </div>
        <span>Por una Cultura de Innovación y Emprendimiento</span>
      </div>

      <div className="footer-grid footer-grid--two">
        <div className="footer-brand">
          <p className="footer-about">
            Formando profesionales de excelencia desde 1958. Comprometidos con
            la innovación, la investigación y el desarrollo de Durango.
          </p>
        </div>

        <div className="footer-col">
          <h4>Contacto</h4>
          <ul>
            <li>
              <a href="#">Fanny Anitua y Priv. Loza s/n, C.P. 34000., Durango, Dgo., México</a>
            </li>
            <li>
              <a href="#">(618) 827-13-65</a>
            </li>
            <li>
              <a href="#">informes@universidad.edu.mx</a>
            </li>
            <li>
              <a href="#">Preguntas frecuentes</a>
            </li>
          </ul>
          <div className="footer-social footer-social--images">
            <a href="#" aria-label="Facebook">
              <img src="/imagenes/facebook.png" alt="Facebook" />
            </a>
            <a href="#" aria-label="X">
              <img src="/imagenes/x.png" alt="X" />
            </a>
            <a href="#" aria-label="Instagram">
              <img src="/imagenes/instagram.jpg" alt="Instagram" />
            </a>
            <a href="#" aria-label="TikTok">
              <img src="/imagenes/tiktok.png" alt="TikTok" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 FECA. Todos los derechos reservados.</span>
        <div className="footer-bottom-links">
          <a href="#">Aviso de privacidad</a>
          <a href="#">Términos de uso</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
