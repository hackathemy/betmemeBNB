import React, { useState } from 'react';
import styles from './index.module.scss';

const GameInfo = () => {
  const [showDetail, setShowDetail] = useState(false);

  const toggleDetail = () => {
    setShowDetail(!showDetail);
  };

  return (
    <div className={styles.gameInfo}>
      <div className={styles.title}>
        <h2>What we need to know</h2>
      </div>
      <div className={styles.detailInfo}>
        <span>Detail Info</span>
        <button className={styles.detailButton} onClick={toggleDetail}>
          {showDetail ? 'Close -' : 'Detail +'}
        </button>
      </div>
      {showDetail && (
        <div className={styles.summary}>
          In the meantime, we're increasing the rewards for users who actively participate in the Launchpad system from 12% to 15%.
        </div>
      )}
    </div>
  );
};

export default GameInfo;
