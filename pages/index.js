import { supabase } from '../lib/initSupabase';

const Home = () => {
  const user = supabase.auth.user();

  if (!user) {
    return <div>no user</div>;
  }

  return (
    <div>
      <div>
        <h1>Hello</h1>
      </div>
    </div>
  );
};

export default Home;
