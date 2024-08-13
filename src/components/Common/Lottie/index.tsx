import Lottie, { Options } from "react-lottie";

interface ILottieContainerProps {
  lottieData: unknown;
  className?: string;
  loopNum?: number;
}

const LottieContainer: React.FC<ILottieContainerProps> = ({
  lottieData,
  className,
  loopNum = 0,
}) => {
  const lottieDefaultOptions: Options = {
    loop: loopNum,
    autoplay: true,
    animationData: lottieData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      className,
    },
  };

  return <Lottie isClickToPauseDisabled options={lottieDefaultOptions} />;
};

export default LottieContainer;
