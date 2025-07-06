import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://icscnpkfiwqmpwsdlayw.supabase.co'
const supabaseKey = 'cyhpi2-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imljc2NucGtmaXdxbXB3c2RsYXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NTgzMDEsImV4cCI6MjA2NzMzNDMwMX0.bfTi44E8RiPBNdH1753is5JFN-XyesePoebzEowOytQ-waVdup'

export const supabase = createClient(supabaseUrl, supabaseKey)