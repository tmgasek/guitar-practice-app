import { useState } from 'react';
import { supabase } from '../lib/initSupabase';
import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
});

const CreateRoutine = () => {
  const router = useRouter();
  //TODO: figure out how to validate dynamic field like this.
  const [exercises, setExercises] = useState([{ name: '', time: 0 }]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const createRoutine = async (data) => {
    try {
      const user = supabase.auth.user();
      const { error } = await supabase.from('routines').insert([
        {
          title: data.title,
          description: data.description,
          exercises,
          user_id: user.id,
        },
      ]);
      if (error) throw error;
      console.log('Successfully submitted');
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (index, e) => {
    const newExerciseValues = [...exercises];
    newExerciseValues[index][e.target.name] = e.target.value;
    setExercises(newExerciseValues);
  };

  const addField = (e) => {
    e.preventDefault();
    setExercises([...exercises, { name: '', time: 0 }]);
  };

  const deleteField = (index, e) => {
    e.preventDefault();
    const newExerciseValues = [...exercises];
    newExerciseValues.splice(index, 1);
    setExercises(newExerciseValues);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(createRoutine)}>
        <label htmlFor="title">Title</label>
        <input name="title" type={'text'} {...register('title')} />
        <div>{errors.title?.message}</div>

        <label htmlFor="description">Description</label>
        <input name="description" type={'text'} {...register('description')} />
        <div>{errors.description?.message}</div>

        <h4>Exercises</h4>
        <div>
          {exercises.map((exercise, index) => (
            <div key={index}>
              <div>
                <label htmlFor="exercise-name">Exercise name</label>
                <input
                  type={'text'}
                  name="name"
                  value={exercise.name || ''}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
              <div>
                <label htmlFor="exercise-time">Time</label>
                <input
                  type={'number'}
                  name="time"
                  value={exercise.time || 0}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
              {index ? (
                <button onClick={(e) => deleteField(index, e)}>Delete</button>
              ) : null}
            </div>
          ))}
        </div>
        <button onClick={addField}>Add an exercise</button>
        <input type={'submit'} />
      </form>
    </div>
  );
};

export default CreateRoutine;
