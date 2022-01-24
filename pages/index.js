import { useEffect, useState } from 'react';

import Routines from '../components/Routines';
import { supabase } from '../lib/initSupabase';

const Home = () => {
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
