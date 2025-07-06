import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_PROJECT_URL'  // ← This is literally the text "YOUR_PROJECT_URL"
const supabaseAnonKey = 'YOUR_ANON_KEY' // ← This is literally the text "YOUR_ANON_KEY"

export const supabase = createClient(supabaseUrl, supabaseKey)