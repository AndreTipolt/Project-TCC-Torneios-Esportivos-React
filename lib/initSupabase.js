/* Supabase (Database) imports */
import { createClient } from '@supabase/supabase-js';


/* Acesso ao bd */
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0aXVzcm1oemZvenF1enhtaGpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTY1MTA5MDAsImV4cCI6MTk3MjA4NjkwMH0.oQasgNT8DUQdE0nwElzZLvVoSgitlyUdpkhGhhgmTVc";
const SUPABASE_URL = "https://ktiusrmhzfozquzxmhjf.supabase.co";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);