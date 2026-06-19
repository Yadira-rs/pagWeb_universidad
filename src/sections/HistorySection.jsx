import { useEffect, useMemo, useRef, useState } from 'react'

function HistorySection({ entries }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const yearsTrackRef = useRef(null)
  const yearButtonRefs = useRef([])
  const autoplayIntervalRef = useRef(null)

  const activeEntry = useMemo(() => entries[activeIndex] ?? entries[0], [activeIndex, entries])
  const collageEntries = useMemo(() => {
    if (!entries.length) return []

    return [0, 1, 2, 3].map((offset) => entries[(activeIndex + offset) % entries.length])
  }, [activeIndex, entries])

  useEffect(() => {
    const activeButton = yearButtonRefs.current[activeIndex]
    activeButton?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }, [activeIndex])

  useEffect(() => {
    if (entries.length < 2) return undefined

    autoplayIntervalRef.current = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % entries.length)
    }, 3200)

    return () => {
      window.clearInterval(autoplayIntervalRef.current)
      autoplayIntervalRef.current = null
    }
  }, [entries.length])

  const goToIndex = (index) => {
    const nextIndex = (index + entries.length) % entries.length
    setActiveIndex(nextIndex)
  }

  const pauseAutoplay = () => {
    if (!autoplayIntervalRef.current) return

    window.clearInterval(autoplayIntervalRef.current)
    autoplayIntervalRef.current = null
  }

  const resumeAutoplay = () => {
    if (autoplayIntervalRef.current || entries.length < 2) return

    autoplayIntervalRef.current = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % entries.length)
    }, 3200)
  }

  return (
    <section id="historia" className="section history-section">
      <div className="container">
        <div className="history-header fade-up">
          <div className="section-label">Trayectoria institucional</div>
          <h2 className="section-title history-title">Un legado que sigue avanzando</h2>
          <p className="section-desc history-subtitle">
            Un recorrido por los momentos que han marcado la evolucion
            academica, institucional y profesional de la facultad.
          </p>
        </div>

        <div
          className="history-years-shell fade-up"
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
          onFocus={pauseAutoplay}
          onBlur={resumeAutoplay}
        >
          <button
            type="button"
            className="history-nav-button"
            aria-label="Ano anterior"
            onClick={() => goToIndex(activeIndex - 1)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="history-years-track" ref={yearsTrackRef}>
            {entries.map((entry, index) => (
              <button
                key={entry.year}
                type="button"
                ref={(element) => {
                  yearButtonRefs.current[index] = element
                }}
                className={`history-year-pill ${index === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
              >
                {entry.year}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="history-nav-button"
            aria-label="Siguiente ano"
            onClick={() => goToIndex(activeIndex + 1)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <div className="history-progress fade-up">
          <div
            className="history-progress-indicator"
            style={{
              left: `${(activeIndex / Math.max(entries.length - 1, 1)) * 100}%`,
            }}
          ></div>
        </div>

        <article className="history-feature fade-up">
          <div className="history-collage" aria-hidden="true">
            {collageEntries.map((entry, index) => (
              <div key={`${entry.year}-${index}`} className={`history-collage-photo photo-${index + 1}`}>
                <img src={entry.image} alt="" />
              </div>
            ))}
          </div>

          <div className="history-feature-body">
            <div className="history-feature-tag">{activeEntry.tag}</div>
            <div className="history-feature-year">{activeEntry.year}</div>
            <h3 className="history-feature-title">{activeEntry.title}</h3>
            {activeEntry.body ? (
              <p className="history-feature-copy">{activeEntry.body}</p>
            ) : null}
            {activeEntry.items ? (
              <div className="history-feature-list">
                {activeEntry.items.map((item) => (
                  <div key={item} className="history-feature-item">
                    <span className="history-feature-bullet"></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <figure className="history-visual history-visual-main">
            <img src={activeEntry.image} alt={activeEntry.title} />
            <figcaption>{activeEntry.tag}</figcaption>
          </figure>
        </article>
      </div>
    </section>
  )
}

export default HistorySection
