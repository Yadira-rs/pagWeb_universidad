function NewsSection({ news }) {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="news-heading fade-up">
          <div>
            <div className="section-label">Noticias y eventos</div>
            <h2 className="section-title">Lo mas reciente</h2>
          </div>
          <a href="#" className="news-link">
            Ver todas las noticias
          </a>
        </div>

        <div className="news-grid fade-up">
          {news.map((item) => (
            <article key={item.title} className="news-card">
              <div className="news-card-img">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="news-card-body">
                <span className="news-tag">{item.tag}</span>
                <div className="news-card-title">{item.title}</div>
                <div className="news-card-date">{item.date}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewsSection
