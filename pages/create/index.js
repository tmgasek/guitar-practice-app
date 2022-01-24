import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import CreateRoutine from '../../components/CreateRoutine';
import { supabase } from '../../lib/initSupabase';

const Create = () => {
  return (
    <div>
      <CreateRoutine />
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
