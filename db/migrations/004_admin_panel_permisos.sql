-- El panel de administración (#/admin, login con Supabase Auth) necesita
-- dos cosas que el esquema original no daba:
--   1. Poder LEER `calificaciones` (la encuesta de satisfacción) — hoy solo
--      se puede insertar, nadie puede leerlas ni por panel ni por Table
--      Editor vía API (el Table Editor del dashboard sí puede, porque usa
--      la service_role key, que ignora RLS).
--   2. Poder CREAR/EDITAR/BORRAR `testimonios` desde el panel — hoy esa
--      tabla solo tiene lectura pública de los publicados.
--
-- No se toca nada de lo que ya funciona para el público (visitas del
-- sitio): solo se agregan permisos para el rol "authenticated", que es
-- exclusivamente quien inició sesión con Supabase Auth en el panel.

-- ─────────────────────────────────────────────
-- Opiniones (calificaciones)
-- ─────────────────────────────────────────────

GRANT SELECT, DELETE ON calificaciones TO authenticated;

CREATE POLICY "panel_lectura_calificaciones" ON calificaciones
    FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "panel_borrado_calificaciones" ON calificaciones
    FOR DELETE
    USING (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────
-- Testimonios (CRUD completo desde el panel)
-- ─────────────────────────────────────────────

GRANT INSERT, UPDATE, DELETE ON testimonios TO authenticated;
GRANT USAGE, SELECT ON testimonios_id_seq TO authenticated;

CREATE POLICY "panel_gestion_testimonios" ON testimonios
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');
