import Routines from '../components/Routines';
import { supabase } from '../lib/initSupabase';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = () => {
  const { data: routines, error } = useSWR('/api/getRoutines', fetcher);

  if (!routines) {
    return null;
  }

  if (error) {
    console.log(error);
    return <div>Error getting data...</div>;
  }

  return (
    <div>
      <Routines routines={routines} />
    </div>
  );
};

export default Home;

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return { props: {}, redirect: { destination: '/login' } };
  }
  return { props: {} };
}
