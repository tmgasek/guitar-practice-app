import { supabase } from '../lib/initSupabase';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Routines, Layout } from '../components';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = () => {
  const router = useRouter();
  const { data: routines, error } = useSWR('/api/getRoutines', fetcher);

  if (!routines) {
    return null;
  }

  if (routines.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-40 gap-4">
        <h2>No routines found!</h2>
        <button className="btn-primary" onClick={() => router.push('/create')}>
          Create a new routine
        </button>
      </div>
    );
  }

  if (error) {
    console.log(error);
    return <div>Error getting data...</div>;
  }

  return (
    <Layout title={'Guitar Practice App'}>
      <Routines routines={routines} />
    </Layout>
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
