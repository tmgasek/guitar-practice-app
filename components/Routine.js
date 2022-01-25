import { useRouter } from 'next/router';
const Routine = ({ routine }) => {
  const router = useRouter();
  console.log(routine);

  const date = new Date(routine.inserted_at).toDateString();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      <div>
        <div className="my-6">
          <h1 className="text-4xl my-2">{routine.title}</h1>
          <p className="text-carbon italic my-1">{routine.description}</p>
          <p>Created on {date}</p>
        </div>
        <div>
          <h3 className="text-2xl my-2">Exercises</h3>
          {routine.exercises.map((exercise) => (
            <div key={exercise.name}>
              {exercise.name}, time: {exercise.time}
            </div>
          ))}
        </div>

        <button
          className="btn-secondary"
          onClick={() => router.push(`/routine/edit/${routine.id}`)}
        >
          Edit routine
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default Routine;
