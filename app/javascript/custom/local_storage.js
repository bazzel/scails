import { pinsOnlyKey, pinnedKey } from "custom/variables";

function isShowingPinnedOnly() {
  return JSON.parse(localStorage.getItem(pinsOnlyKey)) || false;
}

function getPinned() {
  return JSON.parse(localStorage.getItem(pinnedKey)) || [];
}

export { isShowingPinnedOnly, getPinned };
