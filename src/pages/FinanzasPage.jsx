import { useEffect, useRef, useState } from "react";
import Header from "../sections/Header";
import Footer from "../sections/Footer";

const horarios = [
  { area: "Posgrado",          lv: "8:00 – 14:00 hrs",  sabado: "8:00 – 12:00 hrs" },
  { area: "Licenciaturas",    lv: "8:00 – 15:00 hrs",  sabado: "—" },
  { area: "Celci",            lv: "9:00 – 14:00 hrs",  sabado: "—" },
  { area: "Pagos en Línea",   lv: "24 horas",           sabado: "24 horas" },
];

const formasPago = [
  {
    title: "Efectivo en Caja",
    desc: "Pago directo en ventanilla de caja dentro de las instalaciones de la FECA.",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-4H9l3-3 3 3h-2v4z",
    isSvgPath: false,
    svgContent: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
        <rect x="2" y="6" width="20" height="13" rx="2"/>
        <path d="M2 10h20"/>
        <circle cx="12" cy="15" r="2"/>
      </svg>
    ),
  },
  {
    title: "Transferencia Bancaria",
    desc: "Depósito o transferencia a la cuenta institucional de la UJED. Presenta tu comprobante en caja.",
    svgContent: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
        <polyline points="17 1 21 5 17 9"/>
        <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
        <polyline points="7 23 3 19 7 15"/>
        <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
      </svg>
    ),
  },
  {
    title: "Pago en Línea (SUMA+)",
    desc: "Realiza tus pagos de forma segura desde el portal SUMA+ con tarjeta de crédito o débito.",
    svgContent: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    title: "OXXO Pay",
    desc: "Genera tu referencia en el portal institucional y realiza el pago en cualquier tienda OXXO.",
    svgContent: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="28" height="28">
        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 5h12.8M9 19a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
      </svg>
    ),
  },
];

const aranceles = [
  { concepto: "Inscripción semestral",        monto: "Consultar caja" },
  { concepto: "Reinscripción semestral",      monto: "Consultar caja" },
  { concepto: "Cuota de titulación",          monto: "Consultar caja" },
  { concepto: "Certificado de estudios",      monto: "Consultar caja" },
  { concepto: "Constancia de calificaciones", monto: "Consultar caja" },
  { concepto: "Credencial universitaria",     monto: "Consultar caja" },
];

const becas = [
  {
    title: "Beca de Excelencia Académica",
    desc: "Para alumnos con promedio mínimo de 9.0 sin materias reprobadas. Se renueva cada semestre.",
    chip: "Semestral",
  },
  {
    title: "Beca Socioeconómica",
    desc: "Apoyo dirigido a estudiantes en situación de vulnerabilidad económica. Se requiere estudio socioeconómico.",
    chip: "Por solicitud",
  },
  {
    title: "Beca Pronabes / Benito Juárez",
    desc: "Programa federal de becas para educación superior. Trámite en línea a través del portal nacional.",
    chip: "Federal",
  },
  {
    title: "Beca Deportiva / Cultural",
    desc: "Apoyo para alumnos que representan a la FECA o UJED en actividades deportivas o culturales.",
    chip: "Por convocatoria",
  },
];

const STATS = [
  { num: "L–V",        label: "Días de atención" },
  { num: "8–15 hrs",   label: "Horario general" },
  { num: "4",          label: "Formas de pago" },
  { num: "SUMA+",      label: "Portal de pagos" },
];

const procedimientos = [
  {
    title: "Solicitud de Facturación",
    desc: "Procedimiento para solicitar factura fiscal de cualquier pago realizado en ventanilla o en línea.",
    steps: [
      "Realiza tu pago en Caja o en la plataforma SUMA+.",
      "Conserva tu comprobante de pago en formato digital (PDF o foto clara).",
      "Envía un correo a facturacion.feca@ujed.mx con tu comprobante de pago y tu Constancia de Situación Fiscal actualizada.",
      "Especifica el Uso del CFDI y el método de pago.",
      "Recibirás tu factura en un plazo de 24 a 72 horas hábiles."
    ],
    formatUrl: "/ORGANIGRAMA-FECA.pdf",
    formatName: "Formato de Solicitud de Factura (PDF)",
  },
  {
    title: "Pago de Inscripción Referenciado",
    desc: "Instrucciones para generar tu referencia y pagar en sucursales bancarias autorizadas.",
    steps: [
      "Ingresa al portal institucional SUMA+ con tu matrícula y contraseña.",
      "Ve a la sección de 'Pagos' y selecciona el concepto de inscripción.",
      "Elige la opción 'Pago Referenciado en Sucursal Bancaria' y genera la ficha de pago.",
      "Acude a cualquier sucursal de Banamex u OXXO y proporciona la línea de captura.",
      "Sube tu comprobante al portal SUMA+ para validar tu inscripción académica."
    ],
    formatUrl: "/PDUA-SILD27.pdf",
    formatName: "Guía de Pago Referenciado (PDF)",
  },
  {
    title: "Trámite de Devolución / Reembolso",
    desc: "Procedimiento administrativo para solicitar el reembolso de pagos duplicados o incorrectos.",
    steps: [
      "Descarga e imprime el Formato de Solicitud de Reembolso.",
      "Anexa el comprobante de pago original y una copia de tu identificación oficial.",
      "Presenta la documentación en la Dirección de la facultad para firma de autorización.",
      "Entrega el expediente autorizado en el área de Recursos Financieros.",
      "El reembolso se procesará vía transferencia interbancaria en los siguientes 15 días hábiles."
    ],
    formatUrl: "/FOLLETO-GENERAL-CERTIFICACIONES.pdf",
    formatName: "Formato de Reembolso (PDF)",
  },
  {
    title: "Solicitud de Apoyo Financiero / Beca Interna",
    desc: "Procedimiento para estudiantes que desean aplicar a becas socioeconómicas o exenciones de pago.",
    steps: [
      "Descarga y completa el Formato de Solicitud de Beca Interna.",
      "Reúne los requisitos (comprobante de ingresos, promedio, carta de exposición de motivos).",
      "Entrega la solicitud en la oficina de Trabajo Social en las fechas marcadas por la convocatoria.",
      "Realiza el estudio socioeconómico si es requerido.",
      "Revisa la publicación de resultados en el tablero oficial de la facultad."
    ],
    formatUrl: "/ORGANIGRAMA-FECA.pdf",
    formatName: "Formato de Solicitud de Beca (PDF)",
  }
];

function FinanzasPage({ logoImage, newsPanelOpen, setNewsPanelOpen }) {
  const observerRef = useRef(null);
  const [activeProc, setActiveProc] = useState(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".pf-fade").forEach((el) => observerRef.current.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="site-shell">
      <Header
        logoImage={logoImage}
        currentRoute="services"
        newsPanelOpen={newsPanelOpen}
        setNewsPanelOpen={setNewsPanelOpen}
      />

      {/* HERO */}
      <section className="pf-hero" style={{ backgroundImage: "url('/imagenes/feca-entrada.jpg')" }}>
        <div className="pf-hero-overlay" />
        <div className="pf-hero-inner">
          <div className="pf-hero-badge">Servicios · FECA</div>
          <h1 className="pf-hero-title">Finanzas<br />y Caja</h1>
          <p className="pf-hero-sub">
            Información sobre horarios, pagos, aranceles y apoyos económicos para la comunidad FECA‑UJED.
          </p>
        </div>
        <div className="pf-stats">
          {STATS.map((s) => (
            <div key={s.label} className="pf-stat">
              <span className="pf-stat-num">{s.num}</span>
              <span className="pf-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* HORARIOS */}
      <section className="pf-section pf-section-light pf-fade">
        <div className="pf-container">
          <div className="pf-section-head">
            <div className="pf-label">Atención presencial</div>
            <h2 className="pf-section-title">Horarios de Finanzas</h2>
            <p className="pf-section-desc">
              Planifica tu visita con base en los horarios de atención de cada área del departamento.
            </p>
          </div>
          <div className="fin-table-wrap pf-fade">
            <table className="fin-table">
              <thead>
                <tr>
                  <th>Área</th>
                  <th>Lunes – Viernes</th>
                  <th>Sábado</th>
                </tr>
              </thead>
              <tbody>
                {horarios.map((row) => (
                  <tr key={row.area}>
                    <td className="fin-table-area">{row.area}</td>
                    <td>{row.lv}</td>
                    <td className={row.sabado === "—" ? "fin-table-na" : ""}>{row.sabado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pf-info-box pf-fade" style={{ marginTop: 24 }}>
            <h3>Información importante</h3>
            <p>
              Los domingos y días festivos oficiales <strong>no hay servicio de caja</strong>.
              Para pagos urgentes fuera de horario utiliza el portal SUMA+ o Banamex con tu referencia de pago.
            </p>
          </div>
        </div>
      </section>

      {/* FORMAS DE PAGO */}
      <section className="pf-section pf-section-dark pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label pf-label-light">Opciones disponibles</div>
            <h2 className="pf-section-title pf-title-white">Formas de Pago</h2>
            <p className="pf-section-desc pf-desc-white">
              Elige la opción que mejor se adapte a tus necesidades para realizar tus pagos institucionales.
            </p>
          </div>
          <div className="pf-cards-grid pf-fade">
            {formasPago.map((f) => (
              <div key={f.title} className="pf-card pf-card-dark">
                <div className="pf-card-icon">{f.svgContent}</div>
                <h3 className="pf-card-title">{f.title}</h3>
                <p className="pf-card-desc">{f.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <a
              href="https://sumafeca.ujed.mx/"
              target="_blank"
              rel="noreferrer"
              className="pf-btn-primary"
              style={{ background: "linear-gradient(135deg,#e31313,#9b0000)", color: "#fff" }}
            >
              Ir a SUMA+ · Portal de pagos
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ARANCELES */}
      <section className="pf-section pf-section-light pf-fade">
        <div className="pf-container">
          <div className="pf-section-head">
            <div className="pf-label">Costos institucionales</div>
            <h2 className="pf-section-title">Aranceles y Cuotas</h2>
            <p className="pf-section-desc">
              Conceptos más frecuentes de pago. Los montos exactos se consultan directamente en caja o en el portal SUMA+.
            </p>
          </div>
          <div className="fin-aranceles-grid pf-fade">
            {aranceles.map((a) => (
              <div key={a.concepto} className="fin-arancel-card">
                <div className="fin-arancel-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="12" y1="18" x2="12" y2="12"/>
                    <line x1="9" y1="15" x2="15" y2="15"/>
                  </svg>
                </div>
                <div className="fin-arancel-body">
                  <span className="fin-arancel-concepto">{a.concepto}</span>
                  <span className="fin-arancel-monto">{a.monto}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="fin-disclaimer pf-fade">
            * Los aranceles están sujetos a actualización semestral por parte de la administración de la UJED.
            Consulta el monto vigente en caja antes de realizar tu pago.
          </p>
        </div>
      </section>

      {/* BECAS */}
      <section className="pf-section pf-section-dark pf-fade">
        <div className="pf-container">
          <div className="pf-section-head pf-section-head-center">
            <div className="pf-label pf-label-light">Apoyos económicos</div>
            <h2 className="pf-section-title pf-title-white">Becas y Apoyos</h2>
            <p className="pf-section-desc pf-desc-white">
              Programas de apoyo económico disponibles para estudiantes de la FECA‑UJED.
            </p>
          </div>
          <div className="pf-cards-grid pf-fade">
            {becas.map((b) => (
              <div key={b.title} className="pf-card pf-card-dark">
                <div className="pf-chips" style={{ marginBottom: 14 }}>
                  <span className="pf-chip">{b.chip}</span>
                </div>
                <h3 className="pf-card-title">{b.title}</h3>
                <p className="pf-card-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMATOS Y PROCEDIMIENTOS */}
      <section className="pf-section pf-section-light pf-fade">
        <div className="pf-container">
          <div className="pf-section-head">
            <div className="pf-label">Trámites institucionales</div>
            <h2 className="pf-section-title">Formatos y Procedimientos Financieros</h2>
            <p className="pf-section-desc">
              Encuentra las guías oficiales paso a paso y descarga los formatos necesarios para realizar tus solicitudes financieras de forma ordenada.
            </p>
          </div>

          <div className="procedures-accordion pf-fade">
            {procedimientos.map((proc, index) => {
              const isOpen = activeProc === index;
              return (
                <div key={proc.title} className={`procedure-item ${isOpen ? 'is-open' : ''}`}>
                  <button
                    className="procedure-header"
                    onClick={() => setActiveProc(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="procedure-title">{proc.title}</span>
                    <span className="procedure-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </span>
                  </button>
                  <div className="procedure-content-wrap">
                    <div className="procedure-content">
                      <p className="procedure-desc">{proc.desc}</p>
                      <h4 className="procedure-steps-title">Pasos del procedimiento:</h4>
                      <ol className="procedure-steps-list">
                        {proc.steps.map((step, sIdx) => (
                          <li key={sIdx} className="procedure-step-item">{step}</li>
                        ))}
                      </ol>
                      <div className="procedure-action">
                        <a href={proc.formatUrl} download className="pf-btn-primary download-btn">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="16" height="16">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                          </svg>
                          {proc.formatName}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="pf-section pf-section-alt pf-fade">
        <div className="pf-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
            <div>
              <div className="pf-label">¿Tienes dudas?</div>
              <h2 className="pf-section-title">Contacto Finanzas</h2>
              <p className="pf-section-desc" style={{ marginBottom: 28 }}>
                Si tienes preguntas sobre tu situación financiera, pagos pendientes o trámites,
                acércate directamente al área de Finanzas de la FECA.
              </p>
              <div className="pf-contact-list">
                <div className="pf-contact-item">
                  <div className="pf-contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <span className="pf-contact-label">Ubicación</span>
                    <span className="pf-contact-value">Edificio Administrativo FECA – Planta baja</span>
                  </div>
                </div>
                <a href="tel:6188271365" className="pf-contact-item">
                  <div className="pf-contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.82 19 19.5 19.5 0 0 1 5 12 19.79 19.79 0 0 1 1.14 4.16 2 2 0 0 1 3.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11l-.91.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="pf-contact-label">Teléfono</span>
                    <span className="pf-contact-value">(618) 827-13-65</span>
                  </div>
                </a>
                <a href="mailto:finanzas@feca.ujed.mx" className="pf-contact-item">
                  <div className="pf-contact-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div>
                    <span className="pf-contact-label">Correo</span>
                    <span className="pf-contact-value">finanzas@feca.ujed.mx</span>
                  </div>
                </a>
              </div>
            </div>
            <div className="pf-card pf-card-top" style={{ padding: "40px 32px" }}>
              <div className="pf-card-icon" style={{ margin: "0 auto 20px" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="6" width="20" height="13" rx="2"/>
                  <path d="M2 10h20"/>
                  <circle cx="12" cy="15" r="2"/>
                </svg>
              </div>
              <h3 className="pf-card-title" style={{ textAlign: "center" }}>Ventanilla de Caja</h3>
              <p className="pf-card-desc" style={{ textAlign: "center", marginBottom: 20 }}>
                Para pagos en efectivo acude directamente a caja en los horarios indicados.
                Lleva siempre tu número de matrícula.
              </p>
              <div className="pf-chips" style={{ justifyContent: "center" }}>
                <span className="pf-chip">Lun–Vie · 8–14 hrs</span>
                <span className="pf-chip">Sáb · 8–12 hrs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer logoImage={logoImage} />
    </div>
  );
}

export default FinanzasPage;
