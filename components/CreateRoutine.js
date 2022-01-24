import { useState } from 'react';
import { supabase } from '../lib/initSupabase';
import { useRouter } from 'next/router';

const CreateRoutine = () => {
  const router = useRouter();
  // maybe useRef() for this?
  const [routineName, setRoutineName] = useState('');
  const [description, setDescription] = useState('');
  const [exercises, setExercises] = useState([{ name: '', time: 0 }]);
  const [statusMsg, setStatusMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const createRoutine = async () => {
    try {
      const { error } = await supabase.from('routines').insert([
        {
          routine_name: routineName,
          description,
          exercises,
        },
      ]);
      if (error) throw error;
      console.log('Successfully submitted');
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createRoutine();
    console.log('submitted routine');
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
      {statusMsg ||
        (errorMsg && (
          <div>
            <p>{errorMsg}</p>
            <p>{statusMsg}</p>
          </div>
        ))}
      <h2>Create new routine</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="routine-name">Routine name</label>
          <input
            type={'text'}
            id="routine-name"
            value={routineName}
            onChange={(e) => setRoutineName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type={'text'}
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

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
        <button type="submit">Submit routine</button>
      </form>
    </div>
  );
};

export default CreateRoutine;
