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
  const [motherProject, setMotherProject] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [eventTitle, seteventTitle] = useState("");
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
        //ethers.parseUnits(minAmount, "ether"),
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
          <InputBox
            title="Event Title"
            placeholder="Event Title"
            value={eventTitle}
            onChange={(val) => seteventTitle(val.target.value)}
            required={true}
          />
          <InputBox
            title="Project Name"
            placeholder="Project Name"
            value={motherProject}
            onChange={(val) => setMotherProject(val.target.value)}
            required={true}
          />
          <div className={styles.selectContainer}>
          <div className={styles.selectTitle}>Category</div>
          <Select 
            className={styles.selectContent}
            placeholder="Category"
            size="md"
            variant="solid"
            onChange={handleChange}
          >
          </Select> 
          </div>
          <InputBox
            title="Date"
            placeholder="Date"
            value={date}
            onChange={(val) => setDate(val.target.value)}
            required={true}
          />
          <InputBox
            title="Description"
            placeholder="Description"
            value={description}
            onChange={(val) => setDescription(val.target.value)}
            required={true}
          />
          <Button name="Confirm" onClick={createGame} />
        </div>
      )}
    </div>
  );
};

export default CreateGame;
