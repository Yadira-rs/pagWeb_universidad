import { useEffect, useRef, useState } from 'react'

function WhyUsSection({ highlights, teachers }) {
  const [teacherCurrentSlide, setTeacherCurrentSlide] = useState(0)
  const [teacherDetailsOpen, setTeacherDetailsOpen] = useState(false)
  const [teacherTranslateX, setTeacherTranslateX] = useState(0)
  const teacherWrapperRef = useRef(null)
  const teacherCardRefs = useRef([])

  useEffect(() => {
    const updateTeacherCarousel = () => {
      const wrapper = teacherWrapperRef.current
      const currentCard = teacherCardRefs.current[0]

      if (!wrapper || !currentCard) return

      const wrapperWidth = wrapper.offsetWidth
      const cardWidth = currentCard.getBoundingClientRect().width
      const gap = 18
      const centerOffset = (wrapperWidth - cardWidth) / 2
      const nextTranslate = teacherCurrentSlide * (cardWidth + gap) - centerOffset
      setTeacherTranslateX(Math.max(nextTranslate, 0))
    }

    updateTeacherCarousel()
    window.addEventListener('resize', updateTeacherCarousel)
    return () => window.removeEventListener('resize', updateTeacherCarousel)
  }, [teacherCurrentSlide])

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTeacherCurrentSlide((current) => (current + 1) % teachers.length)
      setTeacherDetailsOpen(false)
    }, 5200)

    return () => window.clearInterval(intervalId)
  }, [teachers.length])

  const activeTeacher = teachers[teacherCurrentSlide]

  const handleTeacherClick = (index) => {
    if (teacherCurrentSlide !== index) {
      setTeacherCurrentSlide(index)
      setTeacherDetailsOpen(false)
      return
    }

    setTeacherDetailsOpen((current) => !current)
  }

  return (
    <section className="section section-alt">
      <div className="container">
        <div className="fade-up">
          <div className="section-label">Por que elegirnos</div>
          <h2 className="section-title">Una experiencia educativa completa</h2>
        </div>

        <div className="highlights-grid fade-up">
          {highlights.map((item) => (
            <article key={item.title} className="highlight-card">
              <div className="highlight-icon"></div>
              <div className="highlight-title">{item.title}</div>
              <div className="highlight-desc">{item.description}</div>
            </article>
          ))}
        </div>

        <div className="fade-up teacher-carousel-heading">
          <div className="section-label">Nuestro equipo</div>
          <h3 className="section-title">Maestros destacados</h3>
          <p className="section-desc">
            Conoce a los profesores que acompanan el aprendizaje con
            experiencias reales, mentoria personalizada y vocacion por la
            ensenanza.
          </p>
        </div>

        <div className="teacher-carousel fade-up">
          <button
            type="button"
            className="teacher-arrow teacher-prev"
            aria-label="Anterior"
            onClick={() => {
              setTeacherCurrentSlide(
                (teacherCurrentSlide - 1 + teachers.length) % teachers.length,
              )
              setTeacherDetailsOpen(false)
            }}
          >
            {'<'}
          </button>

          <div className="teacher-carousel-wrapper" ref={teacherWrapperRef}>
            <div
              className="teacher-carousel-track"
              style={{ transform: `translateX(-${teacherTranslateX}px)` }}
            >
              {teachers.map((teacher, index) => (
                <article
                  key={teacher.name}
                  ref={(element) => {
                    teacherCardRefs.current[index] = element
                  }}
                  className={`teacher-card ${index === teacherCurrentSlide ? 'is-center' : ''}`}
                  onClick={() => handleTeacherClick(index)}
                >
                  <div className="teacher-card-img">
                    <img src={teacher.image} alt={teacher.name} />
                  </div>
                  <div className="teacher-card-body">
                    <h4 className="teacher-card-name">{teacher.name}</h4>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="teacher-arrow teacher-next"
            aria-label="Siguiente"
            onClick={() => {
              setTeacherCurrentSlide((teacherCurrentSlide + 1) % teachers.length)
              setTeacherDetailsOpen(false)
            }}
          >
            {'>'}
          </button>

          <div
            className={`teacher-details-panel ${teacherDetailsOpen ? 'active' : ''}`}
          >
            <div className="teacher-card-role">{activeTeacher.role}</div>
            <div className="teacher-card-desc">{activeTeacher.description}</div>
            <div className="teacher-card-details">
              <span>{activeTeacher.years}</span>
              <span>{activeTeacher.focus}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyUsSection
