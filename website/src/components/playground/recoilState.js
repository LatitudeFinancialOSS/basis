import { atom } from "recoil";

export const codeState = atom({
  key: "playgroundCode",
  default: "",
});

export const screensState = atom({
  key: "playgroundScreens",
  default: [],
});

export const componentPreviewCounterState = atom({
  key: "playgroundComponentPreviewCounter",
  default: 0,
});
