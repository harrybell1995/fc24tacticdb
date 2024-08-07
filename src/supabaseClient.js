// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oxafunkrssbzkxxehvgu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94YWZ1bmtyc3Niemt4eGVodmd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMwMTcyNzMsImV4cCI6MjAzODU5MzI3M30.TtCiMCqCWEFssBprSwHWg6ETIqTo8T2Xxa7n_8SZrDU';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
