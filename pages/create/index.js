import ManageRoutine from '../../components/ManageRoutine';
import { supabase } from '../../lib/initSupabase';

const Create = () => {
  return (
    <div>
      <ManageRoutine />
    </div>
  );
};

export default Create;

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return { props: {}, redirect: { destination: '/login' } };
  }

  return { props: {} };
}
