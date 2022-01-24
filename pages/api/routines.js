import { supabase } from '../../lib/initSupabase';

const getRoutines = async (req, res) => {
  const { data: routines, error } = await supabase.from('routines').select('*');
  if (error) return res.status(401).json({ error: error.message });
  return res.status(200).json(routines);
};

export default getRoutines;
