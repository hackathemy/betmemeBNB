import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { betMemeAbi, betMemeContractAddress } from "@/constant/betMeme";
import styles from "./index.module.scss";
import Button from "../Common/Button";

const GameList = () => {
  const [games, setGames] = useState([]);
  const [amount, setAmount] = useState("0.01");
  const [txLoading, setTxLoading] = useState(false);

  useEffect(() => {
    const fetchGameList = async () => {
      if (!window.ethereum) {
        alert("Metamask가 설치되지 않았습니다.");
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
        setGames(gameList);
      } catch (error) {
        console.error("게임 목록 불러오기 실패:", error);
      }
    };

    fetchGameList();
  }, []);

  const betGame = async (gameId: string, position: boolean) => {
    if (!window.ethereum) {
      alert("Metamask가 설치되지 않았습니다.");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      betMemeContractAddress,
      betMemeAbi,
      signer
    );
    const tokenContract = new ethers.Contract(
      "0xE4aB69C077896252FAFBD49EFD26B5D171A32410",
      betMemeAbi,
      signer
    );

    try {
      setTxLoading(true);

      const amountInWei = ethers.parseUnits(amount, "ether");
      const approveTx = await tokenContract.approve(
        betMemeContractAddress,
        amountInWei
      );
      await approveTx.wait();

      const tx = await contract.bet(
        gameId,
        position,
        ethers.parseUnits(amount, "ether")
      );

      await tx.wait();
      alert("게임 배팅 성공!");
    } catch (error) {
      console.error("게임 배팅 실패:", error);
      alert("게임 배팅 실패.");
    } finally {
      setTxLoading(false);
    }
  };

  return (
    <ul id="memeList" className={styles.container}>
      {games.map((game, index) => {
        const gameId = game[0];

        return (
          <div key={index} className={styles.list}>
            <Button
              name="Make Frame"
              onClick={() =>
                navigator.clipboard.writeText(
                  `https://ce5b-69-172-159-97.ngrok-free.app/api/${Number(gameId)}`
                )
              }
            />
            <li>
              <p>
                게임 시작 시간:{" "}
                {new Date(Number(game[1]) * 1000).toLocaleString()}
              </p>
              <p>지속 시간: {Number(game[2])}</p>
              <p>마크된 가격: {ethers.formatUnits(game[3], "ether")}</p>
              <p>마지막 가격: {ethers.formatUnits(game[4], "ether")}</p>
              <p>최소 금액: {ethers.formatUnits(game[5], "ether")}</p>
              <p>Up 금액: {ethers.formatUnits(game[6], "ether")}</p>
              <p>Down 금액: {ethers.formatUnits(game[7], "ether")}</p>
              <p>상금 금액: {ethers.formatUnits(game[8], "ether")}</p>
              <p>종료 여부: {game[9] ? "Yes" : "No"}</p>
              <p>토큰 주소: {game[10]}</p>
            </li>
            {txLoading ? (
              <div>Loading ...</div>
            ) : (
              <div className={styles.buttonWrapper}>
                <Button name="Up" onClick={() => betGame(gameId, true)} />
                <Button name="Down" onClick={() => betGame(gameId, false)} />
              </div>
            )}
          </div>
        );
      })}
    </ul>
  );
};

export default GameList;
