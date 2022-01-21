import { useRouter } from 'next/router';
import { useEffect } from 'react';

const RoutinePage = () => {
  useEffect(() => {}, []);

  const router = useRouter();
  const { id } = router.query;
  return <div>Routine Page {id}</div>;
};

export default RoutinePage;
