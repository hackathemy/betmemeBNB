import React from 'react';
import styles from './index.module.scss';

interface BetDetailsProps {
  gameId?: string;
  token?: string;
}

const BetDetails: React.FC<BetDetailsProps> = ({ gameId, token }) => {
  return (
    <div className={styles.betDetails}>
      <h2>Betting Details</h2>
      <p>Game ID: {gameId}</p>
      <p>Token: {token}</p>
      <p>Current Price: </p>
    </div>
  );
};

export default BetDetails;
