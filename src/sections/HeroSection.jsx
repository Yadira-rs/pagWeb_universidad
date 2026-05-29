import { useEffect, useState } from 'react'

function HeroSection({ slides }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentSlideIndex((current) => (current + 1) % slides.length)
    }, 5200)

    return () => window.clearInterval(intervalId)
  }, [slides.length])

  return (
    <section className="hero">
      <div className="carousel" aria-label="Carrusel de aniversario FECA">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentSlideIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.description}
              className="carousel-slide"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="carousel-slide-content">
                {slide.badge ? (
                  <div className="carousel-badge">{slide.badge}</div>
                ) : null}
                <h1 className="hero-title">
                  {slide.titleLines ? (
                    <>
                      {slide.titleLines[0]}
                      <br />
                      {slide.titleLines[1]}
                      <br />
                      <span>{slide.titleLines[2]}</span>
                    </>
                  ) : (
                    slide.title
                  )}
                </h1>
                <p className="hero-desc">{slide.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="carousel-controls">
          {slides.map((slide, index) => (
            <button
              key={slide.description}
              className={`carousel-dot ${index === currentSlideIndex ? 'active' : ''}`}
              type="button"
              aria-label={`Slide ${index + 1}`}
              onClick={() => setCurrentSlideIndex(index)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
