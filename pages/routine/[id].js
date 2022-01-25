import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/initSupabase';
import EditRoutine from '../../components/EditRoutine';

const RoutinePage = ({ routine }) => {
  const router = useRouter();

  return (
    <div>
      <h1>Routine </h1>
      <div>{routine.title}</div>
      <div>{routine.description}</div>
      {routine.exercises.map((exercise) => (
        <div key={exercise.name}>
          {exercise.name}, time: {exercise.time}
        </div>
      ))}
      <button onClick={() => router.push(`/routine/edit/${routine.id}`)}>
        Edit
      </button>
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
