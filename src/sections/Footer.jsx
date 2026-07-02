import { IconFacebook, IconInstagram, IconXTwitter, IconTikTok } from '../components/SocialIcons';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-tagline">
        <div className="footer-tagline-logos">
          <div className="footer-tagline-logo">
            <img src="/imagenes/logo_ujed.png" alt="UJED" />
          </div>
          <div className="footer-tagline-logo footer-tagline-logo--feca">
            <img src="/imagenes/LOGO_FECA PNG.png" alt="FECA" />
          </div>
        </div>
        <span style={{ textAlign: 'center', flex: 1, fontSize: '28px' }}>Por una Cultura de Innovación y Emprendimiento</span>
      </div>

      <div className="footer-grid footer-grid--three">
        <div className="footer-brand">
          <p className="footer-about">
            Formando profesionales de excelencia desde 1958. Comprometidos con
            la innovación, la investigación y el desarrollo de Durango.
          </p>
        </div>

        <div className="footer-col">
          <h4>Comunidad</h4>
          <ul>
            <li><a href="#/biblioteca">Biblioteca</a></li>
            <li><a href="#/feria">Feria de Emprendimiento</a></li>
            <li><a href="#/grupos-representativos">Grupos representativos</a></li>
            <li><a href="https://sumafeca.ujed.mx/" target="_blank" rel="noreferrer">SUMA+ FECA</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contacto</h4>
          <ul>
            <li>
              <a href="https://maps.app.goo.gl/cn9D7n9UWF9ZckCZ7" target="_blank" rel="noopener noreferrer">
                Fanny Anitua y Priv. Loza s/n, C.P. 34000., Durango, Dgo.,
                México
              </a>
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
          <div className="footer-social">
            <a className="si-facebook" href="https://www.facebook.com/FECAUJEDMX/" aria-label="Facebook" target="_blank" rel="noreferrer">
              <IconFacebook size={22} />
            </a>
            <a className="si-twitter" href="https://x.com/fecaujedmx" aria-label="X / Twitter" target="_blank" rel="noreferrer">
              <IconXTwitter size={22} />
            </a>
            <a className="si-instagram" href="https://www.instagram.com/fecaujedmx" aria-label="Instagram" target="_blank" rel="noreferrer">
              <IconInstagram size={22} />
            </a>
            <a className="si-tiktok" href="https://www.tiktok.com/@fecaujed.mx" aria-label="TikTok" target="_blank" rel="noreferrer">
              <IconTikTok size={22} />
            </a>
          </div>
        </div>
      </div>


<div className="footer-bottom">
        <span>© 2026 FECA. Todos los derechos reservados.</span>
        <div className="footer-bottom-links">
          <a href="#/aviso-de-privacidad">Aviso de privacidad</a>
          <a href="#/terminos-de-uso">Términos de uso</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
