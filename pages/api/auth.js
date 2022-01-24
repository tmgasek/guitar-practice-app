import { supabase } from '../../lib/initSupabase';

const handler = (req, res) => {
  supabase.auth.api.setAuthCookie(req, res);
};

export default handler;
