"use client";

import Button from "@/components/Common/Button";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./index.module.scss";
import clsx from "clsx";
import { frameLink, getCoinInfo, getPrice } from "@/utils/makeCoins";
import { numberWithCommas } from "@/utils/formatNumber";
import { IGameProps } from "..";

interface IGameCardProps {
  game: IGameProps;
}

const GameCard: React.FC<IGameCardProps> = ({ game }) => {
  const [modalView, setModalView] = useState(false);
  const router = useRouter();

  const navigateToDetailPage = () => {
    router.push(`/detail/${game.gameId}`);
    console.log(game);
  };

  const price = getPrice(game.token);
  const pricePercentage = useMemo(() => {
    if (game) {
      const percent =
        ((Number(price) - Number(game.markedPrice)) /
          Number(game.markedPrice)) *
        100;

      return percent;
    }

    return 0;
  }, [game]);

  const date = new Date();
  const dateSecond = date.getTime() / 1000;
  const lockedAmount = (
    Number(game.upAmount) + Number(game.downAmount)
  ).toFixed(2);
  let nowStatus = "";
  if (dateSecond > Number(game.startTime) + Number(game.duration)) {
    nowStatus = "expired";
  } else {
    nowStatus = "live";
  }

  return (
    <ul className={styles.cardContainer} onClick={navigateToDetailPage}>
      <div className={styles.cardContent}>
        <div className={styles.cardTitle}>
          BNB Price Prediction
        </div>
        <div className={styles.description}>
        After AMA, 
        predict changes in token price
        </div>
        <div className={styles.amountDetails}>
          <div className={styles.updownText}>Up:</div>
          <div className={styles.amountLabel}> {game.upAmount} $</div>
          <button
            className={styles.upButton}
            data-text="UP"
            data-percentage={`${((Number(game.upAmount) / Number(game.prizeAmount)) * 100).toFixed(2)} %`}
          ></button>
        </div>
        <div className={styles.amountDetails}>
          <div className={styles.updownText}>Down:</div>
          <div className={styles.amountLabel}> {game.downAmount} $</div>
          <button
            className={styles.downButton}
            data-text="DOWN"
            data-percentage={`${((Number(game.downAmount) / Number(game.prizeAmount)) * 100).toFixed(2)} %`}
          ></button>
        </div>
        <div className={styles.poolAmountText}>Pool Amount: US$ {game.prizeAmount}</div>
      </div>
    </ul>
  );
};

export default GameCard;
