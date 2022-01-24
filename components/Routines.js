import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/initSupabase';

const Routines = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setIsLoading(true);
      let { data: routines, error } = await supabase
        .from('routines')
        .select('*');

      if (error) throw error;
      setData(routines);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!data) {
    return <div>No data...</div>;
  }

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          {item.exercises.map((exercise) => (
            <div key={exercise.name}>
              {exercise.name}, time: {exercise.time}{' '}
            </div>
          ))}
          <Link href={`/routine/${item.id}`}>
            <a>Go to routine</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Routines;
