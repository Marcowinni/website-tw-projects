import { createClient } from '@supabase/supabase-js';

// Stelle sicher, dass diese Variablen in deiner .env Datei existieren
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// WICHTIG: "export const", nicht "export default"
export const supabase = createClient(supabaseUrl, supabaseAnonKey);