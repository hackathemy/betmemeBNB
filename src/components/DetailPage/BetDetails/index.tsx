import React, { useState } from 'react';
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
  currentPrice = '0',
  priceChange,
  betUpPercentage,
  betDownPercentage,
  upAmount = '0',
  downAmount = '0',
}) => {
  const [betValue, setBetValue] = useState('');

  return (
    <div className={styles.betDetails}>
      <div className={styles.currentInfo}>
        <div className={styles.header}>
          <span>Current Info</span>
          <span className={styles.live}>Live</span>
        </div>
        <div>
          <h2>{token}</h2>
        </div>
        <div className={styles.titleAndPrice}>
            <div className={styles.price}>
              <h2>₿{currentPrice}</h2>
            </div>
            <div className={styles.priceStats}>
              <p>최고가: $522,000</p>
              <p>최저가: $493,322</p>
            </div>
        </div>
        <div className={styles.percentages}>
          <div className={styles.up}>
            Up <span>{upAmount}</span>
          </div>
          <div className={styles.down}>
            Down <span>{downAmount}</span>
          </div>
        </div>
      </div>
      <div className={styles.prediction}>
        <p>My prediction & Betting price</p>
        <div className={styles.buttons}>
          <button className={styles.buttonUp}>Up</button>
          <button className={styles.buttonDown}>Down</button>
          <input
            className={styles.input}
            value={betValue}
            onChange={(e) => setBetValue(e.target.value)}
            type="text"
            placeholder="BnB"
          />
        </div>
        <div className={styles.confirmButton}>
          <button>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default BetDetails;
