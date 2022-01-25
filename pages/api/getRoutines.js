import { supabase } from '../../lib/initSupabase';

const getRoutines = async (req, res) => {
  supabase.auth.setAuth(req.cookies['sb:token']);
  const { data, error } = await supabase.from('routines').select('*');
  if (error) return res.status(401).json({ error: error.message });
  return res.status(200).json(data);
};

export default getRoutines;
