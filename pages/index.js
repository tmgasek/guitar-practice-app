import { useEffect, useState } from 'react';
import Routines from '../components/Routines';
import { supabase } from '../lib/initSupabase';

const Home = ({ user }) => {
  return (
    <div>
      <div>
        <h1>Hello</h1>
        <Routines />
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

  return { props: { user } };
}
