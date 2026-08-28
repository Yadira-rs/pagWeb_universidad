import { getToken, supabase as authApi } from "./authClient";

export { getToken };
import { supabase as dbApi } from "./dbClient";
import { supabase as storageApi } from "./storageClient";

// Fachada única: junta los adaptadores de auth, datos y storage en un solo
// objeto con la misma forma que `import { supabase } from "./supabaseClient"`
// tenía antes. Así, migrar cada archivo que ya usaba supabase-js es
// cambiar únicamente esta línea de import, sin tocar el resto del
// componente.
export const supabase = {
  ...dbApi,
  ...authApi,
  ...storageApi,
};
