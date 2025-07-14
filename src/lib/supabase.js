import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://icscnpkfiwqmpwsdlayw.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpZGRnaHBxaWZ2c3RwZ2VobHl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NjEyNjcsImV4cCI6MjA2NzMzNzI2N30.jChC0eIO2s--hCHdqNgx9WZ8Oe-XD9Mb_ZbYMbL9QTc';

console.log('🔧 Supabase Config:', { 
  url: supabaseUrl ? '✅ Set' : '❌ Missing', 
  key: supabaseKey ? '✅ Set' : '❌ Missing' 
});

export const supabase = createClient(supabaseUrl, supabaseKey);