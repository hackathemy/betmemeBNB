'useclient';

import { useSearchParams } from 'next/navigation';

const DetailPage = () => {
    const params = useSearchParams();
    const gameId = params.get('gameId');
    const token = params.get('token');

  return (
    <div>
      <h1>Game Detail Page</h1>
      <p>Game ID: {gameId}</p>
      <p>Token: {token}</p>
    </div>
  );
};

export default DetailPage;
