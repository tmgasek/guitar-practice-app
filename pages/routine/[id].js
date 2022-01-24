import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/initSupabase';
import EditRoutine from '../../components/EditRoutine';

const RoutinePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [routine, setRoutine] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      getRoutine(id);
    }
  }, [id, isEditing]);

  const getRoutine = async (id) => {
    try {
      setIsLoading(true);
      let { data: routine, error } = await supabase
        .from('routines')
        .select('*')
        .eq('id', id);

      if (error) throw error;
      setRoutine(routine[0]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

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

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!routine) {
    return <div>No routine...</div>;
  }

  return (
    <div>
      <h1>Routine {id}</h1>
      <div>{routine.title}</div>
      <div>{routine.description}</div>
      {routine.exercises.map((exercise) => (
        <div key={exercise.name}>
          {exercise.name}, time: {exercise.time}
        </div>
      ))}
      <button onClick={(e) => handleDelete(e, routine)}>Delete</button>
      <button onClick={(e) => setIsEditing(!isEditing)}>Edit</button>
      {isEditing ? (
        <EditRoutine routineToEdit={routine} setIsEditing={setIsEditing} />
      ) : null}
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
