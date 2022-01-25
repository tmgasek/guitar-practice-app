import { useRouter } from 'next/router';
import { supabase } from '../../../lib/initSupabase';
import ManageRoutine from '../../../components/ManageRoutine';
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
      <ManageRoutine routineToEdit={routine} />
      <button
        className="btn-tertiary"
        onClick={(e) => handleDelete(e, routine)}
      >
        Delete routine
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
