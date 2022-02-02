import { useState, useEffect } from 'react';
import Link from 'next/link';
import { calculateTotalRoutineTime } from '../lib';

const RoutineCard = ({ routine }) => {
  const [totalTime, setTotalTime] = useState(null);

  useEffect(() => {
    setTotalTime(calculateTotalRoutineTime(routine.exercises));
  }, [routine.exercises]);

  return (
    <Link href={`/routine/${routine.id}`} passHref>
      <div className="border-2 border-sky p-4 rounded-lg shadow-white  shadow-md flex flex-col cursor-pointer transition duration-150 ease-in-out transform sm:hover:scale-105 relative bg-opacity-10 bg-sky">
        <div>
          <h2 className="text-xl font-semibold truncate tracking-wide">
            {routine.title}
          </h2>
          <p className="truncate text-carbon text-sm">{routine.description}</p>
        </div>

        <div>
          <div className="border-[1px] my-1 border-sky opacity-40"></div>
          {routine.exercises.map((exercise) => (
            <div key={exercise.name} className="flex justify-between">
              <p className="truncate">{exercise.name}</p>
              <p>{parseInt(exercise.time)}m</p>
            </div>
          ))}
          <div className="border-[1px] my-1 border-sky opacity-40"></div>
        </div>
        <div className="absolute top-2 right-2 bg-sky text-dark rounded-full p-2 text-xs font-bold shadow-md shadow-dark">
          {totalTime}m
        </div>
      </div>
    </Link>
  );
};

export default RoutineCard;
