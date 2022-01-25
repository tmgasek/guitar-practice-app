import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/initSupabase';

import useSWR from 'swr';
const fetcher = (url) => fetch(url).then((res) => res.json());

const RoutinePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: routine, error } = useSWR(
    id ? `/api/getRoutine?id=${id}` : null,
    fetcher
  );

  if (!routine) {
    return null;
  }

  if (error) {
    console.log(error);
    return <div>Error getting data...</div>;
  }

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

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return { props: {}, redirect: { destination: '/login' } };
  }
  return { props: {} };
}
