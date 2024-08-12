'use client';

import Button from "@/components/Common/Button";
import { useMemo, useState } from "react";
import { useRouter } from 'next/navigation';
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
    router.push(`/DetailPage?gameId=${game.gameId}&token=${game.token}`);
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
    <ul className={styles.cardContainer}>
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
          <div>
            <div className={styles.betInfo}>
              <img
                src={getCoinInfo(game.token).image}
                alt="img"
                className={styles.tokenImg}
              />
              {getCoinInfo(game.token).denom} 🦇 ${game.markedPrice}
            </div>
            <div className={styles.lockedContainer}>
              {game.isEnded && Number(game.lastPrice) > 0 ? (
                <>Final Price</>
              ) : (
                <>Current Price</>
              )}
              <div className={styles.betResult}>
                {game.isEnded && Number(game.lastPrice) > 0 ? (
                  <>
                    ${game.lastPrice}
                    {Number(game.lastPrice) - Number(game.markedPrice) > 0 ? (
                      <div className={clsx(styles.betPercent, styles.isPlus)}>
                        Up Win !
                      </div>
                    ) : (
                      <div className={clsx(styles.betPercent)}>Down Win !</div>
                    )}
                  </>
                ) : (
                  <>
                    ${price}
                    <div
                      className={clsx(
                        styles.betPercent,
                        pricePercentage > 0 && styles.isPlus
                      )}
                    >
                      {pricePercentage?.toFixed(2)} %
                    </div>
                  </>
                )}
              </div>
              <div className={styles.lockedAmount}>
                Locked Pool:
                <div>
                  {numberWithCommas(lockedAmount)}{" "}
                  {getCoinInfo(game.token).denom}
                </div>
              </div>
              <div className={styles.lockedAmount}>
                Bet Up:
                <div>
                  {numberWithCommas(Number(game.upAmount))}{" "}
                  {getCoinInfo(game.token).denom} ( win to{" "}
                  {numberWithCommas(
                    Number(game.upAmount) +
                      (Number(game.downAmount) * 0.7 + Number(game.prizeAmount))
                  )}{" "}
                  {getCoinInfo(game.token).denom} )
                </div>
              </div>
              <div className={styles.lockedAmount}>
                Bet Down:
                <div>
                  {numberWithCommas(Number(game.downAmount))}{" "}
                  {getCoinInfo(game.token).denom} ( win to{" "}
                  {numberWithCommas(
                    Number(game.downAmount) +
                      (Number(game.upAmount) * 0.7 + Number(game.prizeAmount))
                  )}{" "}
                  {getCoinInfo(game.token).denom} )
                </div>
              </div>
              <div className={styles.lockedAmount}>
                Prize Pool:
                <div>
                  {numberWithCommas(Number(game.prizeAmount))}{" "}
                  {getCoinInfo(game.token).denom}
                </div>
              </div>
            </div>
          </div>
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
      <BetMemeModal
        game={game}
        modalView={modalView}
        onCloseModal={() => setModalView(false)}
      />
    </ul>
  );
};

export default GameCard;
