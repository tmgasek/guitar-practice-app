import Link from 'next/link';

const Routines = ({ routines }) => {
  return (
    <div className="grid grid-cols-3 justify-center">
      {routines.map((item) => (
        <div className="p-4 border-2 m-4" key={item.id}>
          <h2>{item.title}</h2>
          {item.exercises.map((exercise) => (
            <div key={exercise.name}>
              {exercise.name}, time: {exercise.time}{' '}
            </div>
          ))}
          <Link href={`/routine/${item.id}`}>
            <a>Go to routine</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Routines;
