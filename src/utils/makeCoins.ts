export const frameLink =
  "https://a127-119-205-221-93.ngrok-free.app/api/approve/";

const decimals = 10;

export const coins = [
  {
    address: "0xBE5Da172BbffffF5AEa27017745e71eA1907dad1",
    image:
      "https://github.com/juniahn-dev/twitter/blob/main/assets/BRETT-token.png?raw=true",
    denom: "BRETT",
  },
  {
    address: "0xE4aB69C077896252FAFBD49EFD26B5D171A32410",
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
  if (address.indexOf("0xBE5Da172BbffffF5AEa27017745e71eA1907dad1") >= 0) {
    return getRandomBetween(0.98);
  } else if (
    address.indexOf("0xE4aB69C077896252FAFBD49EFD26B5D171A32410") >= 0
  ) {
    return getRandomBetween(1.03);
  } else {
    return getRandomBetween(1);
  }
};

export const getCoinInfo = (address: string) => {
  if (address.indexOf("0xBE5Da172BbffffF5AEa27017745e71eA1907dad1") >= 0) {
    return {
      image:
        "https://github.com/juniahn-dev/twitter/blob/main/assets/BRETT-token.png?raw=true",
      denom: "BRETT",
      address,
    };
  } else if (
    address.indexOf("0xE4aB69C077896252FAFBD49EFD26B5D171A32410") >= 0
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
