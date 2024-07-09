export const frameLink =
  "https://0495-119-205-221-93.ngrok-free.app/api/approve/";

const decimals = 10;

export const coins = [
  {
    address: "0xb1E8b5F91938868CB0E1d50958D56e2497827f2A",
    image:
      "https://github.com/juniahn-dev/twitter/blob/main/assets/BRETT-token.png?raw=true",
    denom: "BRETT",
  },
  {
    address: "0x36e23aCAa237fdD90180Fe6B7d2630e53DB61924",
    image:
      "https://github.com/juniahn-dev/twitter/blob/main/assets/TOSHI-token.png?raw=true",
    denom: "TOSHI",
  },
];

export const getRandomBetween = (basePrice: number) => {
  const randomValue = Math.random() * 0.2 * basePrice + basePrice * 0.9;
  return randomValue.toFixed(decimals);
};

export const getPrice = (address: string) => {
  if (address.indexOf("0xb1E8b5F91938868CB0E1d50958D56e2497827f2A") >= 0) {
    return getRandomBetween(0.98);
  } else if (
    address.indexOf("0x36e23aCAa237fdD90180Fe6B7d2630e53DB61924") >= 0
  ) {
    return getRandomBetween(1.03);
  } else {
    return getRandomBetween(1);
  }
};

export const getCoinInfo = (address: string) => {
  if (address.indexOf("0xb1E8b5F91938868CB0E1d50958D56e2497827f2A") >= 0) {
    return {
      image:
        "https://github.com/juniahn-dev/twitter/blob/main/assets/BRETT-token.png?raw=true",
      denom: "BRETT",
      address,
    };
  } else if (
    address.indexOf("0x36e23aCAa237fdD90180Fe6B7d2630e53DB61924") >= 0
  ) {
    return {
      image:
        "https://github.com/juniahn-dev/twitter/blob/main/assets/TOSHI-token.png?raw=true",
      denom: "TOSHI",
      address,
    };
  } else {
    return {
      image:
        "https://github.com/juniahn-dev/twitter/blob/main/assets/INU-token.png?raw=true",
      denom: "BSHIB",
      address,
    };
  }
};
