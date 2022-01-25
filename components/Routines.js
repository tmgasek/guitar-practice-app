import RoutineCard from './RoutineCard';

const Routines = ({ routines }) => {
  return (
    <div className="grid sm:grid-cols-3 grid-cols-1 justify-center gap-4">
      {routines.map((routine) => (
        <RoutineCard key={routine.id} routine={routine} />
      ))}
    </div>
  );
};

export default Routines;
