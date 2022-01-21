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

  const deleteOne = async (id) => {
    try {
      const { error } = await supabase.from('routines').delete().eq('id', id);
      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (e, item) => {
    e.preventDefault();
    await deleteOne(item.id);
    setData((data) => data.filter((i) => i.id !== item.id));
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
          <h2>{item.routine_name}</h2>
          {item.exercises.map((exercise) => (
            <div key={exercise.name}>
              {exercise.name}, time: {exercise.time}{' '}
            </div>
          ))}
          <Link href={`/routine/${item.id}`}>
            <a>Go to routine</a>
          </Link>
          <button onClick={(e) => handleDelete(e, item)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Routines;
