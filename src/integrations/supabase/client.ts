// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://gsvaxymcflhkossiixkf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzdmF4eW1jZmxoa29zc2lpeGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3NzgzODAsImV4cCI6MjA1OTM1NDM4MH0.1NechVVYpgyUjE1YQgnZDFIYDmhGDfb06Dqg14SvoR0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);