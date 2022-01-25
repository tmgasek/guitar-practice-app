import Link from 'next/link';

const Routines = ({ data }) => {
  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
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
