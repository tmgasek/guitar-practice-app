import { supabase } from '../../lib/initSupabase';

const getRoutine = async (req, res) => {
  const id = req.query.id;

  supabase.auth.setAuth(req.cookies['sb:token']);
  const { data, error } = await supabase
    .from('routines')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return res.status(401).json({ error: error.message });
  return res.status(200).json(data);
};

export default getRoutine;
