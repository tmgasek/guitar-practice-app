export const calculateTotalRoutineTime = (exercises) => {
  let total = 0;
  exercises.forEach((exercise) => (total += parseInt(exercise.time)));
  return total;
};
