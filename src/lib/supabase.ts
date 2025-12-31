import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Optional safety check (kept simple)
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase env variables are missing');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
