import { useState } from 'react';
import { supabase } from '../lib/initSupabase';
import { useRouter } from 'next/router';

const EditRoutine = ({ routineToEdit, setIsEditing }) => {
  console.log(routineToEdit);

  const router = useRouter();
  // maybe useRef() for this?
  const [title, setTitle] = useState(routineToEdit.title);
  const [description, setDescription] = useState(routineToEdit.description);
  const [exercises, setExercises] = useState(routineToEdit.exercises);
  const [statusMsg, setStatusMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const editRoutine = async () => {
    try {
      const { error } = await supabase
        .from('routines')
        .update({
          title,
          description,
          exercises,
        })
        .eq('id', routineToEdit.id);
      if (error) throw error;
      console.log('Successfully edited');
      setIsEditing(false);
      // router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    editRoutine();
    console.log('submitted routine for editing');
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
      <h2>Edit routine</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="routine-name">Routine name</label>
          <input
            type={'text'}
            id="routine-name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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

export default EditRoutine;
