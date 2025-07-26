import { createClient } from '@supabase/supabase-js';


const supabase = createClient(
  "https://hrhzjakvqdwutwmasqsy.supabase.co", 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyaHpqYWt2cWR3dXR3bWFzcXN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1MDk4NTQsImV4cCI6MjA2OTA4NTg1NH0.4HLA6vvGO9c-w5LTrof7zfa4QEAqQrjZxIbGXM2UDAQ"
);

export default supabase;