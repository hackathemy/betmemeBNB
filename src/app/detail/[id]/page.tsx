"use client";

import GameDetail from "@/components/GameDetail";
import { IGameProps } from "@/components/GameList";
import Wrapper from "@/components/Wrapper";
import { betMemeContractAddress, betMemeAbi } from "@/constant/betMeme";
import { ethers } from "ethers";
import { orderBy } from "lodash";
import GameInfo from "@/components/DetailPage/GameInfo";
import CommentsSection from "@/components/DetailPage/CommentsSection";
import BetDetails from "@/components/DetailPage/BetDetails";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Detail() {
  const [game, setGame] = useState<IGameProps>();
  const params = useParams();
  const { id } = params as { id: string };
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
        setGame(parseGameList.find((game: IGameProps) => game.gameId.toString() === id));
      } catch (error) {
        console.error("Failed to load game list:", error);
      }
    };

    fetchGameList();
  }, []);

  useEffect(() => {
    console.log('Current game state:', game);
  }, [game]);

  return (
    <Wrapper>
      <>
      <GameDetail game={game} />
      <div className="page-header">
                  <h1>#Ongoing Match</h1>
                  <h2>After AMA, predict changes in BnB token price</h2>
              </div>
              <div className="content-section">
                  <div>
                    <GameInfo/>
                    <CommentsSection/>
                  </div>
                  <div>
                    <BetDetails
                      token={game?.token}
                      currentPrice={game?.lastPrice ?? '0'}
                      upAmount={`${game?.upAmount}%`}
                      downAmount={`${game?.downAmount}%`}
                    />
                  </div>
              </div>
      </>
    </Wrapper>
  );
}
