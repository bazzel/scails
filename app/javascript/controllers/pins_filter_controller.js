import { Controller } from "@hotwired/stimulus";
import { startViewTransition } from "../utils.js";

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
    startViewTransition(() =>
      this.pinOutlets.forEach((outlet) =>
        outlet.element.classList.remove(...outlet.hiddenClasses)
      )
    );
  }

  #showPinnedOnly() {
    startViewTransition(() =>
      this.pinOutlets
        .filter((outlet) => !this.#getPinned().includes(outlet.modeNumberValue))
        .forEach((outlet) =>
          outlet.element.classList.add(...outlet.hiddenClasses)
        )
    );
  }

  #getPinned() {
    return JSON.parse(localStorage.getItem(pinnedKey)) || [];
  }

  #isShowingPinnedOnly() {
    return JSON.parse(localStorage.getItem(pinsOnlyKey)) || false;
  }
}
