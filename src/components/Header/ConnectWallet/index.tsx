import { getaccountAssetsStorageState } from "@/store/account";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Web3 } from "web3";
import styles from "./index.module.scss";

const ConnectWallet: React.FC = () => {
  const [accountAssets, setAccountAssetsState] = useRecoilState(
    getaccountAssetsStorageState
  );
  const baseNetworkVersion = 84532;
  const [web3, setWeb3] = useState<Web3 | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      setWeb3(new Web3(window.ethereum));
    }
  }, []);

  useEffect(() => {
    if (web3 && !accountAssets.account) {
      connectMetamask();
    }
  }, [web3, accountAssets.account]);

  const changeNetwork = async () => {
    if (web3 && window.ethereum?.networkVersion !== baseNetworkVersion) {
      try {
        await window.ethereum?.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: web3.utils.toHex(baseNetworkVersion) }],
        });
      } catch (err: any) {
        console.error("Network change failed", err);
        throw new Error(err.message);
      }
    }
  };

  const connectMetamask = async () => {
    if (window.ethereum) {
      try {
        await changeNetwork();

        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3!.eth.getAccounts();
        const value = {
          account: accounts[0],
        };
        setAccountAssetsState(value);
      } catch (err: any) {
        console.error(err.message);
      }
    } else {
      alert("Please download metamask");
    }
  };

  return (
    <button className={styles.container} onClick={() => connectMetamask()}>
      {accountAssets.account || "Connect"}
    </button>
  );
};

export default ConnectWallet;
