import React from 'react';
import styles from './index.module.scss';

interface BetDetailsProps {
  gameId?: string;
  token?: string;
  currentPrice: string;
  priceChange: number;
  betUpPercentage: number;
  betDownPercentage: number;
  upAmount?: string;
  downAmount?: string;
}

const BetDetails: React.FC<BetDetailsProps> = ({ 
  gameId, 
  token,
  upAmount,
  downAmount,
  currentPrice, 
  priceChange, 
  betUpPercentage, 
  betDownPercentage 
}) => {
  return (
    <div className={styles.betDetails}>
      <div className={styles.currentInfo}>
        <div className={styles.header}>
          <span className={styles.live}>Live</span>
          <h2>₿{currentPrice}</h2>
          <div className={styles.priceChange}>{priceChange > 0 ? `+${priceChange}%` : `${priceChange}%`}</div>
        </div>
        <div className={styles.percentages}>
          <div className={styles.up}>
            Up <span>{upAmount}%</span>
          </div>
          <div className={styles.down}>
            Down <span>{downAmount}%</span>
          </div>
        </div>
      </div>
      <div className={styles.prediction}>
        <button className={styles.buttonUp}>Up</button>
        <button className={styles.buttonDown}>Down</button>
      </div>
      <div className={styles.confirmButton}>
        <button>Confirm</button>
      </div>
    </div>
  );
};

export default BetDetails;
