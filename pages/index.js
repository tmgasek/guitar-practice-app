import { useEffect, useState } from 'react';
import { supabase } from '../lib/initSupabase';

const Home = (props) => {
  if (!props.user) {
    return <div>No user.</div>;
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
