"useclient";

import { IGameProps } from "../GameList";

interface IGameCardProps {
  game: IGameProps;
}

const GameDetail: React.FC<IGameCardProps> = ({ game }) => {
  return (
    <div>
      <h1>Game Detail Page</h1>
      <p>Game ID: {game.gameId.toString()}</p>
      <p>Token: {game.token}</p>
    </div>
  );
};

export default GameDetail;
