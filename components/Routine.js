import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { calculateTotalRoutineTime } from '../lib';
import Timer from './Timer';

const Routine = ({ routine }) => {
  const [totalTime, setTotalTime] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setTotalTime(calculateTotalRoutineTime(routine.exercises));
  }, [routine.exercises]);

  const date = new Date(routine.inserted_at).toDateString();

  return (
    <div className="grid grid-cols-1 sm:gap-8">
      <div className="mx-auto">{totalTime && <Timer time={totalTime} />}</div>
      <div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl my-2">{routine.title}</h1>
            <p className="text-carbon my-1">{routine.description}</p>
            <p>Created on {date}</p>
          </div>
          <div>
            <button
              className="btn-tertiary my-2"
              onClick={() => router.push(`/routine/edit/${routine.id}`)}
            >
              Edit
            </button>
          </div>
        </div>
        <div>
          <h3 className="text-2xl my-2">Exercises</h3>
          <div className="border-[1px] border-sky opacity-40 my-4"></div>
          {routine.exercises.map((exercise) => (
            <div key={exercise.name} className="flex justify-between">
              <div className="pr-1"> {exercise.name}</div>
              <div className="whitespace-nowrap">
                {Number.parseInt(exercise.time)} minutes
              </div>
            </div>
          ))}
          <div className="border-[1px] border-sky opacity-40 my-4"></div>
          <div className="flex justify-between text-xl ">
            <div>Total</div>
            <div>{totalTime} minutes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Routine;
