import { useEffect, useMemo, useRef, useState } from 'react'

function HistorySection({ entries }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const yearsTrackRef = useRef(null)
  const yearButtonRefs = useRef([])
  const hoverIntervalRef = useRef(null)

  const activeEntry = useMemo(() => entries[activeIndex] ?? entries[0], [activeIndex, entries])

  useEffect(() => {
    const activeButton = yearButtonRefs.current[activeIndex]
    activeButton?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }, [activeIndex])

  useEffect(() => {
    return () => {
      if (hoverIntervalRef.current) {
        window.clearInterval(hoverIntervalRef.current)
      }
    }
  }, [])

  const goToIndex = (index) => {
    const nextIndex = (index + entries.length) % entries.length
    setActiveIndex(nextIndex)
  }

  const startHoverAutoplay = () => {
    if (hoverIntervalRef.current) return

    hoverIntervalRef.current = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % entries.length)
    }, 1400)
  }

  const stopHoverAutoplay = () => {
    if (!hoverIntervalRef.current) return

    window.clearInterval(hoverIntervalRef.current)
    hoverIntervalRef.current = null
  }

  return (
    <section id="historia" className="section history-section">
      <div className="container">
        <div className="history-header fade-up">
          <div className="section-label">Nuestra historia</div>
          <h2 className="section-title history-title">Nuestra historia</h2>
          <p className="section-desc history-subtitle">
            Un recorrido por los hitos que han definido nuestra evolución
            académica, institucional y profesional a lo largo de los años.
          </p>
        </div>

        <div className="history-years-shell fade-up">
          <button
            type="button"
            className="history-nav-button"
            aria-label="Año anterior"
            onClick={() => goToIndex(activeIndex - 1)}
          >
            {'<'}
          </button>

          <div
            className="history-years-track"
            ref={yearsTrackRef}
            onMouseEnter={startHoverAutoplay}
            onMouseLeave={stopHoverAutoplay}
          >
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
            aria-label="Siguiente año"
            onClick={() => goToIndex(activeIndex + 1)}
          >
            {'>'}
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
          <div className="history-visual history-visual-muted">
            <img src={activeEntry.image} alt={activeEntry.title} />
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

          <div className="history-visual history-visual-main">
            <img src={activeEntry.image} alt={activeEntry.title} />
          </div>
        </article>
      </div>
    </section>
  )
}

export default HistorySection
