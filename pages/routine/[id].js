import { useRouter } from 'next/router';
import { supabase } from '../../lib/initSupabase';

import useSWR from 'swr';
import Routine from '../../components/Routine';
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
      <Routine routine={routine} />
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
