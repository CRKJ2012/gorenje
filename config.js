// config.js
const SUPABASE_URL = 'https://zarxvhlvbgrtriafqfjr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inphcnh2aGx2YmdydHJpYWZxZmpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAzOTE5NDYsImV4cCI6MjEwNTk2Nzk0Nn0.VieGkLDW1JH4ezimYxPo1rVjEJp9WpIRiV2idfzLql4';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);