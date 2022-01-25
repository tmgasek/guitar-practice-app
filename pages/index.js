import Routines from '../components/Routines';
import { supabase } from '../lib/initSupabase';

const Home = ({ routines }) => {
  console.log(routines);
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

  supabase.auth.setAuth(req.cookies['sb:token']);

  const { data: routines, error } = await supabase.from('routines').select('*');

  if (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      routines,
    },
  };
}
