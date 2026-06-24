const directors = [
  {
    name: "Dr. Jesús Guillermo Sotelo Asef",
    role: "Dirección",
    degrees: ["Doctorado en Administración", "Maestría en Gestión Pública", "Lic. en Administración"],
    quote: "Comprometidos con la excelencia académica y el desarrollo integral de nuestra comunidad universitaria, guiamos a la FECA hacia un futuro de innovación y pertinencia regional.",
    image: "/imagenes/director.jpeg",
  },
  {
    name: "Dr. Miguel",
    role: "Secretaría Técnica",
    degrees: ["Doctorado en Administración Pública", "Maestría en Gestión Organizacional", "Lic. en Administración"],
    quote: "La Secretaría Técnica trabaja día a día para que cada proceso institucional fluya con eficiencia, transparencia y orientación al servicio de la comunidad.",
    image: "/imagenes/inicio.png",
  },
  {
    name: "Dr. Luis",
    role: "División de Estudios de Posgrado",
    degrees: ["Doctorado en Ciencias Contables", "Maestría en Finanzas", "Lic. en Contabilidad"],
    quote: "El posgrado de la FECA es el espacio donde la investigación y la práctica convergen para formar los líderes académicos y empresariales del mañana.",
    image: "/imagenes/aniversario.jpeg",
  },
  {
    name: "Dr. Iván",
    role: "CIIEDO",
    degrees: ["Doctorado en Ciencias Económicas", "Maestría en Administración de Empresas", "Lic. en Economía"],
    quote: "El CIIEDO es un espacio de formación continua donde el conocimiento se conecta directamente con el mundo empresarial.",
    image: "/imagenes/imagen.jpeg",
  },
  {
    name: "Dr. Juan",
    role: "Centro de Idiomas (CELCI)",
    degrees: ["Doctorado en Lingüística Aplicada", "Maestría en Enseñanza del Inglés", "Lic. en Letras Inglesas"],
    quote: "En el Centro de Idiomas creemos que el dominio de lenguas es la llave que abre las puertas al mundo. Formamos ciudadanos globales desde la FECA.",
    image: "/imagenes/cafeteria.jpeg",
  },
];

export default function DirectorsList() {
  return (
    <section className="el-section">
      {/* Encabezado */}
      <header className="el-header">
        <p className="el-eyebrow">Nuestro equipo</p>
        <h2 className="el-title">Directivos</h2>
        <div className="el-rule" />
        <p className="el-subtitle">
          Conoce al equipo que guía la vida académica, administrativa
          y de vinculación de nuestra facultad.
        </p>
      </header>

      {/* Lista */}
      <ol className="el-list">
        {directors.map((d, i) => (
          <li key={i} className="el-row">
            <div className="el-photo-wrap">
              <img src={d.image} alt={d.name} className="el-photo" />
            </div>

            <div className="el-body">
              <span className="el-role">{d.role}</span>
              <h3 className="el-name">{d.name}</h3>

              <div className="el-badges">
                {d.degrees.map((deg) => (
                  <span key={deg} className="el-badge">{deg}</span>
                ))}
              </div>

              <blockquote className="el-quote">
                <p>"{d.quote}"</p>
              </blockquote>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
