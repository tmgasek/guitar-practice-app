import { useEffect, useState } from 'react';
import { supabase } from '../lib/initSupabase';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AiOutlineDelete } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const isExerciseEmpty = () => {
    let isError = false;

    if (!exercises[0].name.length) {
      isError = true;
    }
    if (!exercises[0].time) {
      isError = true;
    }

    return isError;
  };

  const createRoutine = async (data) => {
    if (isExerciseEmpty()) {
      toast.error('Add at least one exercise!');
      return;
    }
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
      router.push('/');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const editRoutine = async (data) => {
    if (isExerciseEmpty()) {
      toast.error('Add at least one exercise!');
      return;
    }
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

  const deleteRoutine = async () => {
    try {
      const { error } = await supabase
        .from('routines')
        .delete()
        .eq('id', routineToEdit.id);
      if (error) throw error;
    } catch (error) {
      console.error(error);
    } finally {
      router.push('/');
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
      <ToastContainer />
      <div className="flex items-center justify-between mb-4">
        {routineToEdit ? (
          <h2 className="text-2xl">Edit routine</h2>
        ) : (
          <h2 className="text-2xl">Create a new routine</h2>
        )}
        <button className="btn-tertiary" onClick={() => router.back()}>
          Cancel
        </button>
      </div>

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
          <div className="error">{errors.title?.message}</div>

          <input
            name="description"
            type={'text'}
            {...register('description')}
            placeholder="Description"
            defaultValue={routineToEdit?.description || ''}
          />
          <div className="error">{errors.description?.message}</div>
        </div>

        <div>
          <h4 className="text-xl my-2">Exercises</h4>
          {exercises.map((exercise, index) => (
            <div key={index}>
              <div className="flex flex-col">
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
                <AiOutlineDelete
                  onClick={(e) => deleteField(index, e)}
                  className="cursor-pointer hover:scale-105 text-red-600 my-1 text-xl"
                />
              ) : null}
            </div>
          ))}
          <div className="flex justify-between items-center">
            <button className="btn-secondary my-2" onClick={addField}>
              Add a new exercise
            </button>
            {routineToEdit && (
              <button className="btn-tertiary" onClick={() => deleteRoutine()}>
                Delete routine
              </button>
            )}
          </div>
        </div>
        <button className="btn-primary my-4 text-xl " type={'submit'}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateRoutine;
