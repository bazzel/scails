import { Controller } from "@hotwired/stimulus";

const pinsOnlyKey = "pinsOnly";
const pinnedKey = "pinned";

export default class extends Controller {
  static targets = ["checkbox"];
  static outlets = ["pin"];

  connect() {
    this.restoreFilter();
  }

  restoreFilter() {
    const isShowingPinnedOnly = this.#isShowingPinnedOnly();

    if (isShowingPinnedOnly) {
      this.#showPinnedOnly();
    } else {
      this.#showAll();
    }

    this.checkboxTarget.checked = isShowingPinnedOnly;
  }

  toggle() {
    localStorage.setItem(pinsOnlyKey, !this.#isShowingPinnedOnly());
    this.restoreFilter();
  }

  #showAll() {
    this.pinOutlets.forEach((outlet) =>
      outlet.element.classList.remove(outlet.hiddenClass)
    );
  }

  #showPinnedOnly() {
    this.pinOutlets
      .filter((outlet) => !this.#getPinned().includes(outlet.modeNumberValue))
      .forEach((outlet) => outlet.element.classList.add(outlet.hiddenClass));
  }

  #getPinned() {
    return JSON.parse(localStorage.getItem(pinnedKey)) || [];
  }

  #isShowingPinnedOnly() {
    return JSON.parse(localStorage.getItem(pinsOnlyKey)) || false;
  }
}
