import React, { useState } from 'react';
import styles from './index.module.scss';
import ButtonUpImg from '@/assets/icons/detail/ButtonUp.png';
import ButtonDownImg from '@/assets/icons/detail/ButtonDown.png';

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
          <div className={styles.price}>
            ₿{currentPrice}
          </div>
        <div className={styles.percentages}>
          <div className={styles.updownGraph}>
            <div className={styles.updown}>
              <span>Up {upAmount}</span>
              <span>Down {downAmount}</span>
            </div>
            <div className={styles.Graphbody}>
              <div className={styles.graphBar} style={{ width: `${betUpPercentage}%`, backgroundColor: '#00A29A' }}></div>
              <div className={styles.graphBar} style={{ width: `${betDownPercentage}%`, backgroundColor: '#C73535' }}></div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.prediction}>
      <p>My prediction</p>
        <div className={styles.buttons}>
          <button className={styles.buttonUp}>
            <img src={ButtonUpImg.src} alt="Up" />
          </button>
          <button className={styles.buttonDown}>
            <img src={ButtonDownImg.src} alt="Down" />
          </button>
        </div>
        <p>Betting price</p>
        <input
            className={styles.input}
            value={betValue}
            onChange={(e) => setBetValue(e.target.value)}
            type="text"
            placeholder="BnB"
          />
        <div className={styles.confirmButton}>
          <button>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default BetDetails;
