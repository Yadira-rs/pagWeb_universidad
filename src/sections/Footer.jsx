function Footer({ logoImage }) {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-logo">
            <div className="logo-emblem footer-emblem">
              <img src={logoImage} alt="FECA" />
            </div>
            FECA
          </div>
          <p className="footer-about">
            Formando profesionales de excelencia desde 1958. Comprometidos con la
            innovacion, la investigacion y el desarrollo de Durango.
          </p>
          <div className="footer-social">
            <a href="#" aria-label="Facebook">
              f
            </a>
            <a href="#" aria-label="X">
              x
            </a>
            <a href="#" aria-label="Instagram">
              ig
            </a>
            <a href="#" aria-label="YouTube">
              yt
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Programas</h4>
          <ul>
            <li><a href="#">Licenciaturas</a></li>
            <li><a href="#">Posgrados</a></li>
            <li><a href="#">Diplomados</a></li>
            <li><a href="#">Educacion continua</a></li>
            <li><a href="#">Doctorados</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Institucion</h4>
          <ul>
            <li><a href="#">Nuestra historia</a></li>
            <li><a href="#">Acreditaciones</a></li>
            <li><a href="#">Investigacion</a></li>
            <li><a href="#">Vinculacion</a></li>
            <li><a href="#">Rankings</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contacto</h4>
          <ul>
            <li><a href="#">Blvd. Universidad 100, Durango</a></li>
            <li><a href="#">(618) 000-0000</a></li>
            <li><a href="#">informes@universidad.edu.mx</a></li>
            <li><a href="#">Mapa del campus</a></li>
            <li><a href="#">Preguntas frecuentes</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2025 FECA. Todos los derechos reservados.</span>
        <div className="footer-bottom-links">
          <a href="#">Aviso de privacidad</a>
          <a href="#">Terminos de uso</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
