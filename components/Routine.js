import { useRouter } from 'next/router';
import { useState } from 'react';
import Timer from './Timer';

const Routine = ({ routine }) => {
  const router = useRouter();

  console.log(routine);

  let totalTime = 0;
  routine.exercises.forEach(
    (exercise) => (totalTime += parseInt(exercise.time))
  );

  const date = new Date(routine.inserted_at).toDateString();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-8 sm:items-center">
      <div>
        <div className="my-6">
          <h1 className="text-4xl my-2">{routine.title}</h1>
          <p className="text-carbon my-1">{routine.description}</p>
          <p>Created on {date}</p>
        </div>
        <div className="sm:pr-10">
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

        <button
          className="btn-secondary my-10"
          onClick={() => router.push(`/routine/edit/${routine.id}`)}
        >
          Edit routine
        </button>
      </div>
      <div>
        <Timer time={totalTime} />
      </div>
    </div>
  );
};

export default Routine;
