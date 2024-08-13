import { atom, selector } from "recoil";

export const accountAssetsStorageState = atom<any>({
  key: "#accountStorageAssets",
  default: {},
});

export const getaccountAssetsStorageState = selector<any>({
  key: "#getAccountStorageAssets",
  get: ({ get }) => {
    const accountAssetsStorage = get(accountAssetsStorageState);

    return accountAssetsStorage;
  },
  set: ({ get, set }, params) => {
    const accountAssetsStorage = get(accountAssetsStorageState);

    const value = { ...accountAssetsStorage, params };

    set(accountAssetsStorageState, value.params);
  },
});
