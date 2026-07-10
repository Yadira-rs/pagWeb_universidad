-- "Automatically expose new tables" quedó desactivado a propósito (más seguro),
-- pero eso significa que hay que dar el permiso de acceso a cada tabla a mano.
-- Sin este GRANT, las políticas de RLS nunca se llegan a evaluar: el visitante
-- del sitio (rol "anon") no tiene ni siquiera permiso de tocar la tabla.

GRANT USAGE ON SCHEMA public TO anon, authenticated;

GRANT SELECT ON
  secciones, bloques_contenido, documentos, configuracion_sitio,
  directivos, directivo_grados, programas_academicos, cursos_servicios,
  calendario_eventos, conceptos_pago, anuncios_noticias, historia_eventos,
  preguntas_frecuentes, grupos_estudiantiles, testimonios, menu_cafeteria
TO anon, authenticated;

GRANT INSERT ON calificaciones, visitas TO anon, authenticated;

-- Las columnas id son SERIAL (usan una secuencia interna); insertar una fila
-- nueva requiere permiso sobre esa secuencia, no solo sobre la tabla.
GRANT USAGE, SELECT ON calificaciones_id_seq, visitas_id_seq TO anon, authenticated;
