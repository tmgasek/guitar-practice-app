import { useEffect, useState } from 'react';
import { supabase } from '../lib/initSupabase';
import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  title: yup.string().required().min(3).max(20),
  description: yup.string().min(3).max(50),
  name: yup.string().min(5),
});
const CreateRoutine = ({ routineToEdit }) => {
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

  useEffect(() => {
    if (routineToEdit) {
      setExercises(routineToEdit.exercises);
    }
  }, [routineToEdit]);

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

  const editRoutine = async (data) => {
    try {
      const { error } = await supabase
        .from('routines')
        .update({
          title: data.title,
          description: data.description,
          exercises,
        })
        .eq('id', routineToEdit.id);

      if (error) throw error;
      router.push('/');
      console.log('Successfully edited');
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
      {routineToEdit ? (
        <h2 className="text-2xl mb-4">Edit routine</h2>
      ) : (
        <h2 className="text-2xl mb-4">Create a new routine</h2>
      )}
      <form
        onSubmit={
          routineToEdit
            ? handleSubmit(editRoutine)
            : handleSubmit(createRoutine)
        }
        className="flex flex-col"
      >
        <div className="flex flex-col">
          <input
            name="title"
            type={'text'}
            {...register('title')}
            placeholder="Title"
            defaultValue={routineToEdit?.title || ''}
          />
          <div>{errors.title?.message}</div>

          <input
            name="description"
            type={'text'}
            {...register('description')}
            placeholder="Description"
            defaultValue={routineToEdit?.description || ''}
          />
          <div>{errors.description?.message}</div>
        </div>

        <div>
          <h4>Exercises</h4>
          {exercises.map((exercise, index) => (
            <div key={index}>
              <div>
                <input
                  type={'text'}
                  name="name"
                  value={exercise?.name || ''}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Exercise name"
                />
              </div>
              <div>
                <input
                  className="w-20"
                  type={'number'}
                  name="time"
                  value={exercise?.time || ''}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Time"
                />
                minutes
              </div>
              {index ? (
                <button onClick={(e) => deleteField(index, e)}>Delete</button>
              ) : null}
            </div>
          ))}
          <button className="btn-secondary" onClick={addField}>
            Add an exercise
          </button>
        </div>
        <input className="btn-primary " type={'submit'} />
      </form>
    </div>
  );
};

export default CreateRoutine;
