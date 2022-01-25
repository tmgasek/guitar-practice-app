import Link from 'next/link';

const RoutineCard = ({ routine }) => {
  let totalTime = 0;
  routine.exercises.forEach(
    (exercise) => (totalTime += parseInt(exercise.time))
  );

  return (
    <Link href={`/routine/${routine.id}`} passHref>
      <div className="border-2 p-4 rounded-lg shadow-md  flex flex-col cursor-pointer transition duration-150 ease-in-out transform sm:hover:scale-105 relative">
        <div>
          <h2 className="text-xl font-semibold truncate">{routine.title}</h2>
          <p className="truncate">{routine.description}</p>
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
        <div className="absolute top-2 right-2 bg-sky text-dark rounded-full p-2 text-xs font-semibold">
          {totalTime}m
        </div>
      </div>
    </Link>
  );
};

export default RoutineCard;
