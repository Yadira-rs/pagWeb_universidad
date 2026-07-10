-- La fecha mostrada en las tarjetas de anuncios incluye hora y lugar
-- (ej. "15 de julio, 2026 · 10:00 hrs · Sala CIIEDO"), no solo un día.
-- Se agrega un campo de texto libre para eso; `fecha` sigue sirviendo
-- para ordenar/filtrar por fecha real.
ALTER TABLE anuncios_noticias ADD COLUMN fecha_texto VARCHAR(150);
