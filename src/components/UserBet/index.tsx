import { betMemeAbi, betMemeContractAddress } from "@/constant/betMeme";
import { getaccountAssetsStorageState } from "@/store/account";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styles from "./index.module.scss";
import TrophyLottie from "@/assets/icons/lottie/TrophyLottie.json";
import PendingLottie from "@/assets/icons/lottie/PendingLottie.json";
import { numberWithCommas } from "@/utils/formatNumber";
import { isEmpty, orderBy } from "lodash";
import dynamic from "next/dynamic";
import clsx from "clsx";
import { getCoinInfo, getPrice } from "@/utils/makeCoins";
import BadIconPNG from "@/assets/icons/common/BadIcon.png";

const Lottie = dynamic(() => import("../Common/Lottie"), {
  ssr: false,
});

interface IBetsProps {
  amount: string;
  betUp: boolean;
  gameId: BigInt;
  status: "PENDING" | "WON" | "LOST";
  markedPrice: string;
  lastPrice: string;
  prizeAmount: string;
  token: string;
}

const UserBet = () => {
  const [bets, setBets] = useState<IBetsProps[]>([]);
  const accountAssets = useRecoilValue(getaccountAssetsStorageState);

  useEffect(() => {
    const fetchGameList = async () => {
      if (!window.ethereum) {
        alert("Not installed Metamask");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        betMemeContractAddress,
        betMemeAbi,
        provider
      );

      try {
        if (accountAssets.account) {
          const gameList = await contract.getGameList();
          const allBets = [] as any;

          for (const v of gameList) {
            const betList = await contract.userBets(
              accountAssets.account,
              v[0]
            );

            if (isEmpty(betList[3])) {
              continue;
            }

            allBets.push({
              gameId: betList[0],
              betUp: betList[1],
              amount: String(betList[2]),
              status: betList[3],
              markedPrice: ethers.formatUnits(v[3], "ether"),
              lastPrice: ethers.formatUnits(v[4], "ether"),
              prizeAmount: ethers.formatUnits(v[8], "ether"),
              token: v[10],
            });
          }

          setBets(orderBy(allBets, "gameId", "desc"));
        }
      } catch (error) {
        console.error("Failed to load game list:", error);
      }
    };

    fetchGameList();
  }, [accountAssets]);

  return (
    <div className={styles.container}>
      {bets.map((v, idx) => {
        const price = getPrice(v.token || "");

        const pricePercentage = (() => {
          const percent =
            ((Number(price) - Number(v.markedPrice)) / Number(v.markedPrice)) *
            100;

          return percent;
        })();

        return (
          <div key={idx} className={styles.claimContainer}>
            <div className={styles.item}>
              <div className={styles.itemRight}>
                <div className={styles.title}>
                  {v.status === "PENDING" && (
                    <>
                      PENDING
                      <Lottie
                        lottieData={PendingLottie}
                        className={clsx(styles.lottie, styles.pending)}
                      />
                    </>
                  )}
                  {v.status !== "PENDING" && (
                    <>
                      <div className={styles.expiredStatus}>
                        <div>{v.status === "WON" ? "Winner" : "Loser"}</div>
                      </div>
                      {v.status === "WON" ? (
                        <Lottie
                          lottieData={TrophyLottie}
                          className={styles.lottie}
                        />
                      ) : (
                        <img src={BadIconPNG.src} className={styles.badIcon} />
                      )}
                    </>
                  )}
                </div>
                <span className={styles.upBorder}></span>
                <span className={styles.downBorder}></span>
              </div>

              <div className={styles.itemLeft}>
                <div className={styles.betInfo}>
                  <div className={styles.betList}>
                    Bet Status
                    <div>{v.betUp ? <div>Up</div> : <div>Down</div>}</div>
                  </div>
                  <div className={styles.betList}>
                    Bet Amount
                    <div>
                      {numberWithCommas(Number(v.amount) / 10 ** 18)}{" "}
                      {getCoinInfo(v.token).denom}
                    </div>
                  </div>
                  <div className={styles.priceWrapper}>
                    <div className={styles.priceContainer}>
                      <div className={styles.priceTitle}>Start Price</div>
                      <div>{Number(v.markedPrice).toFixed(10)}</div>
                    </div>
                    <div className={styles.priceContainer}>
                      <div className={styles.priceTitle}>
                        {Number(v.lastPrice) <= 0
                          ? "Current Price"
                          : "Last Price"}
                      </div>
                      <div>
                        {Number(v.lastPrice) <= 0 ? price : v.lastPrice}
                      </div>
                    </div>
                  </div>
                  {v.status === "WON" && (
                    <div className={clsx(styles.percentage, styles.won)}>
                      Prize: {v.prizeAmount}
                    </div>
                  )}
                  {v.status === "PENDING" && (
                    <div
                      className={clsx(
                        styles.percentage,
                        pricePercentage > 0 && styles.isPlus
                      )}
                    >
                      {pricePercentage.toFixed(2)} %
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserBet;
