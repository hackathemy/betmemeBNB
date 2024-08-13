import dynamic from "next/dynamic";
import styles from "./index.module.scss";
import LoadingLottie from "@/assets/icons/lottie/LoadingLottie.json";

const Lottie = dynamic(() => import("../Lottie"), {
  ssr: false,
});

const LottieContainer = () => {
  return (
    <div className={styles.container}>
      <Lottie lottieData={LoadingLottie} loopNum={100} />
    </div>
  );
};

export default LottieContainer;
