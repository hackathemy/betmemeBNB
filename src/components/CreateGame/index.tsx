import React, { useState } from "react";
import { ethers } from "ethers";
import styles from "./index.module.scss";
import { betMemeAbi, betMemeContractAddress } from "@/constant/betMeme";
import InputBox from "../Common/InputBox";
import Button from "../Common/Button";
import LottieContainer from "../Common/Loading";
import { Option, Select } from "@mui/joy";
import { coins } from "@/utils/makeCoins";

const CreateGame = () => {
  const [duration, setDuration] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [txLoading, setTxLoading] = useState(false);

  const createGame = async () => {
    if (!window.ethereum) {
      alert("Not installed Metamask");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      betMemeContractAddress,
      betMemeAbi,
      signer
    );

    try {
      setTxLoading(true);

      const tx = await contract.createGame(
        duration,
        ethers.parseUnits(minAmount, "ether"),
        tokenAddress
      );

      await tx.wait();
      alert("Game created successful!");
    } catch (error) {
      console.error("Game created fail:", error);
      alert("Game created fail.");
    } finally {
      setTxLoading(false);
    }
  };

  const handleChange = (
    event: React.SyntheticEvent | null,
    value: string | null
  ) => {
    event?.preventDefault();

    if (value) {
      setTokenAddress(value);
    }
  };

  return (
    <div className={styles.container}>
      {txLoading ? (
        <LottieContainer />
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.selectContainer}>
            <div className={styles.selectTitle}>Coin</div>
            <Select
              className={styles.selectContent}
              placeholder="Choose coin"
              size="md"
              variant="solid"
              onChange={handleChange}
            >
              {coins.map((v) => {
                return (
                  <Option key={v.address} value={v.address}>
                    <img className={styles.tokenImg} src={v.image} />
                    {v.denom}
                  </Option>
                );
              })}
            </Select>
          </div>
          <InputBox
            title="Duration"
            placeholder="Duration"
            value={duration}
            onChange={(val) => setDuration(val.target.value)}
            required={true}
          />
          <InputBox
            title="Minimum Amount"
            placeholder="Minimum Amount"
            value={minAmount}
            onChange={(val) => setMinAmount(val.target.value)}
            required={true}
          />
          <Button name="Create Game" onClick={createGame} />
        </div>
      )}
    </div>
  );
};

export default CreateGame;
