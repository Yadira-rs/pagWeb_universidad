function DirectorPhotoShowcase({
  eyebrow,
  title,
  name,
  quote,
  images = [],
}) {
  const [primaryImage, ...thumbs] = images;

  if (!primaryImage) return null;

  return (
    <section className="director-photo-section">
      <div className="director-photo-container">
        <h2 className="director-photo-heading">{title}</h2>
        <article className="director-photo-card">
          <div className="director-photo-media">
            <img src={primaryImage} alt={name || title} className="director-photo-img" />
          </div>
          <div className="director-photo-content">
            <span className="director-photo-badge">{eyebrow}</span>
            <h3 className="director-photo-name">{name}</h3>
            {quote && <p className="director-photo-quote">"{quote}"</p>}
            {thumbs.length > 0 && (
              <div className="director-photo-thumbs" aria-label={`Más fotos de ${title}`}>
                {thumbs.map((image) => (
                  <img key={image} src={image} alt="" loading="lazy" />
                ))}
              </div>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}

export default DirectorPhotoShowcase;
