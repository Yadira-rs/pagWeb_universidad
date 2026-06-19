const directors = [
  {
    name: "Jesús Guillermo Sotelo Asef",
    degrees: ["Dr.", "Director General"],
    role: "Director FECA",
    area: "Gestión institucional · Liderazgo académico",
    quote:
      "Comprometidos con la excelencia académica y el desarrollo integral de nuestra comunidad universitaria, guiamos a la FECA hacia un futuro de innovación y pertinencia regional.",
    image: "/imagenes/director.jpeg",
  },
  {
    name: "Iván",
    degrees: ["Dr.", "Director"],
    role: "Director CIIEDO",
    area: "Vinculación empresarial · Programas ejecutivos",
    quote:
      "El CIIEDO es un espacio de formación continua donde el conocimiento se conecta directamente con el mundo empresarial. Un programa diseñado para desarrollar líderes con visión global y compromiso social.",
    image: "/imagenes/imagen.jpeg",
  },
  {
    name: "Juan",
    degrees: ["Dr.", "Director"],
    role: "Director CELCI",
    area: "Formación internacional · Inglés práctico",
    quote:
      "En el CELCI creemos que el dominio de idiomas es la llave que abre las puertas al mundo. Formamos ciudadanos globales desde la FECA.",
    image: "/imagenes/cafeteria.jpeg",
  },
  {
    name: "Luis",
    degrees: ["Dr.", "Director"],
    role: "Director de Posgrado",
    area: "Investigación aplicada · Formación avanzada",
    quote:
      "El posgrado de la FECA es el espacio donde la investigación y la práctica convergen para formar los líderes académicos y empresariales del mañana.",
    image: "/imagenes/aniversario.jpeg",
  },
  {
    name: "Miguel",
    degrees: ["Dr.", "Secretario"],
    role: "Secretaría Técnica",
    area: "Gestión operativa · Excelencia institucional",
    quote:
      "La Secretaría Técnica trabaja día a día para que cada proceso institucional fluya con eficiencia, transparencia y orientación al servicio de la comunidad.",
    image: "/imagenes/inicio.png",
  },
];

export default function DirectorsList() {
  return (
    <section className="dl-section">
      {/* Encabezado de sección */}
      <header className="dl-header">
        <p className="dl-eyebrow">Nuestro equipo</p>
        <h2 className="dl-title">Directivos</h2>
        <div className="dl-rule" />
        <p className="dl-subtitle">
          Conoce al equipo que guía la vida académica, administrativa y de
          vinculación de nuestra facultad.
        </p>
      </header>

      {/* Lista de directivos */}
      <ol className="dl-list">
        {directors.map((d, i) => (
          <li key={i} className="dl-item">
            {/* Foto */}
            <div className="dl-photo-wrap">
              <img src={d.image} alt={d.name} className="dl-photo" />
            </div>

            {/* Contenido */}
            <div className="dl-content">
              <span className="dl-role">{d.role}</span>

              <h3 className="dl-name">{d.name}</h3>

              <div className="dl-degrees">
                {d.degrees.map((deg) => (
                  <span key={deg} className="dl-badge">{deg}</span>
                ))}
              </div>

              <blockquote className="dl-quote">
                <p>"{d.quote}"</p>
              </blockquote>

              <p className="dl-area">{d.area}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
