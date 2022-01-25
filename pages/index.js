import Routines from '../components/Routines';
import { supabase } from '../lib/initSupabase';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = () => {
  const { data: routines } = useSWR('/api/getRoutines', fetcher);

  if (!routines) {
    return null;
  }
  return (
    <div>
      <div>
        <h1>Hello</h1>
        <Routines data={routines} />
      </div>
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
