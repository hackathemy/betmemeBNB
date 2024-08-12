import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { betMemeAbi, betMemeContractAddress } from "@/constant/betMeme";
import styles from "./index.module.scss";
import GameCard from "./GameCard";
import { orderBy } from "lodash";

export interface IGameProps {
  gameId: BigInt;
  startTime: BigInt;
  duration: BigInt;
  markedPrice: string;
  lastPrice: string;
  minAmount: string;
  upAmount: string;
  downAmount: string;
  prizeAmount: string;
  isEnded: boolean;
  token: string;
  betUsers: string[];
}

const GameList = () => {
  const [games, setGames] = useState<IGameProps[]>([]);

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
        const gameList = await contract.getGameList();
        const parseGameList = gameList.map((v: any) => {
          return {
            gameId: v[0],
            startTime: v[1],
            duration: v[2],
            markedPrice: ethers.formatUnits(v[3], "ether"),
            lastPrice: ethers.formatUnits(v[4], "ether"),
            minAmount: ethers.formatUnits(v[5], "ether"),
            upAmount: ethers.formatUnits(v[6], "ether"),
            downAmount: ethers.formatUnits(v[7], "ether"),
            prizeAmount: ethers.formatUnits(v[8], "ether"),
            isEnded: v[9],
            token: v[10],
            betUsers: v[11],
          };
        });

        setGames(orderBy(parseGameList, "gameId", "desc"));
      } catch (error) {
        console.error("Failed to load game list:", error);
      }
    };

    fetchGameList();
  }, []);

  const dummyGame: IGameProps = {
    gameId: BigInt(0),
    startTime: BigInt(Math.floor(Date.now() / 1000)),
    duration: BigInt(3600),
    markedPrice: "0.00",
    lastPrice: "0.00",
    minAmount: "0.01",
    upAmount: "0.00",
    downAmount: "0.00",
    prizeAmount: "0.00",
    isEnded: false,
    token: "DUMMY",
    betUsers: [],
  };

  return (
    <ul id="memeList" className={styles.container}>
      <GameCard key="dummy-game" game={dummyGame} />
      {games.map((game, idx) => {
        return <GameCard key={`${String(game.gameId)}-${idx}`} game={game} />;
      })}
    </ul>
  );
};

export default GameList;
