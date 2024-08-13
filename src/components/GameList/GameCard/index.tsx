"use client";

import Button from "@/components/Common/Button";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./index.module.scss";
import BetMemeModal from "@/components/BetMemeModal";
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

  const remain = (
    (Number(game.duration) - (dateSecond - Number(game.startTime))) /
    60
  ).toFixed(2);

  return (
    <ul className={styles.cardContainer} onClick={navigateToDetailPage}>
      {game.isEnded && (
        <div
          className={clsx(
            styles.backgroundEnd,
            Number(game.lastPrice) - Number(game.markedPrice) > 0 && styles.up
          )}
        />
      )}
      <div className={styles.cardContent}>
        <div>
          <div className={styles.liveHeader}>
            <div className={styles.liveWrapper}>
              <div className={styles.isLive}>
                <div
                  className={clsx(
                    styles.circle,
                    styles[game.isEnded ? "expired" : "live"]
                  )}
                />
                {nowStatus === "expired" || game.isEnded
                  ? "Bet game ended"
                  : "Betting now"}
              </div>
              <div>
                {nowStatus === "expired" || game.isEnded
                  ? ""
                  : `( ${remain} min remain )`}
              </div>
            </div>
            {nowStatus === "live" && (
              <Button
                name="copy"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${frameLink}${Number(game.gameId)}/${game.token}/${Number(game.startTime) + Number(game.duration)}`
                  );
                  alert("copy frame link!");
                }}
                styled={styles.copyBtn}
              />
            )}
          </div>
          <div className={styles.btnWrapper}>
            {nowStatus === "live" && (
              <Button
                styled={styles.betButton}
                name="Let's Bet !"
                onClick={navigateToDetailPage}
              />
            )}
            {(nowStatus === "expired" ||
              (game.isEnded && Number(game.lastPrice) > 0)) && (
              <Button
                styled={styles.button}
                name="Finished"
                disabled={game.isEnded}
              />
            )}
          </div>
        </div>
      </div>
    </ul>
  );
};

export default GameCard;
