import { supabase } from '../../lib/initSupabase';
import { Layout, ManageRoutine } from '../../components';
const Create = () => {
  return (
    <Layout title={'Create new routine'}>
      <div className="max-w-lg mx-auto">
        <ManageRoutine />
      </div>
    </Layout>
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
