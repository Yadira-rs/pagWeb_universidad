-- Ajustes a "Solicitudes de acceso al panel":
--   1. Ya no se exige correo @ujed.mx — se acepta cualquier correo.
--   2. Solo el administrador principal puede aprobar/rechazar o borrar una
--      solicitud. Cualquier otro admin con sesión iniciada puede seguir
--      viendo la lista, pero los botones de acción no le van a funcionar.
--
-- Para cambiar quién es el administrador principal más adelante: reemplaza
-- el correo 'comunicacionsocial.feca@ujed.mx' en las dos políticas de abajo
-- por el correo nuevo y vuelve a correr este archivo (también hay que
-- actualizar MAIN_ADMIN_EMAIL en src/components/admin/AccesoManager.jsx
-- para que los botones se vean/oculten correctamente en la pantalla).

alter table solicitudes_acceso_panel drop constraint if exists solicitudes_acceso_panel_correo_check;

drop policy if exists solicitudes_acceso_panel_admin_update on solicitudes_acceso_panel;
create policy solicitudes_acceso_panel_admin_update on solicitudes_acceso_panel
    for update
    using (auth.jwt() ->> 'email' = 'comunicacionsocial.feca@ujed.mx')
    with check (auth.jwt() ->> 'email' = 'comunicacionsocial.feca@ujed.mx');

drop policy if exists solicitudes_acceso_panel_admin_delete on solicitudes_acceso_panel;
create policy solicitudes_acceso_panel_admin_delete on solicitudes_acceso_panel
    for delete
    using (auth.jwt() ->> 'email' = 'comunicacionsocial.feca@ujed.mx');
