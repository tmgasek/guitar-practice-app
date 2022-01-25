import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/initSupabase';
import EditRoutine from '../../../components/EditRoutine';

const RoutinePage = ({ routine }) => {
  const router = useRouter();

  const deleteOne = async (id) => {
    try {
      const { error } = await supabase.from('routines').delete().eq('id', id);
      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (e, routine) => {
    e.preventDefault();
    await deleteOne(routine.id);
    router.push('/');
  };

  return (
    <div>
      <EditRoutine routineToEdit={routine} />
      <button onClick={(e) => handleDelete(e, routine)}>Delete</button>
    </div>
  );
};

export default RoutinePage;

export async function getServerSideProps({ req, params }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return { props: {}, redirect: { destination: '/login' } };
  }

  supabase.auth.setAuth(req.cookies['sb:token']);

  const { data: routine, error } = await supabase
    .from('routines')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      routine,
    },
  };
}
