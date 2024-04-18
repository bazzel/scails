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
      this.#startViewTransition(() => this.#showPinnedOnly());
    } else {
      this.#startViewTransition(() => this.#showAll());
    }

    this.checkboxTarget.checked = isShowingPinnedOnly;
  }

  toggle() {
    localStorage.setItem(pinsOnlyKey, !this.#isShowingPinnedOnly());
    this.restoreFilter();
  }

  #startViewTransition(fn) {
    if (!document.startViewTransition) {
      fn();
      return;
    }

    document.startViewTransition(() => fn());
  }

  #showAll() {
    this.pinOutlets.forEach((outlet) =>
      outlet.element.classList.remove(...outlet.hiddenClasses)
    );
  }

  #showPinnedOnly() {
    this.pinOutlets
      .filter((outlet) => !this.#getPinned().includes(outlet.modeNumberValue))
      .forEach((outlet) =>
        outlet.element.classList.add(...outlet.hiddenClasses)
      );
  }

  #getPinned() {
    return JSON.parse(localStorage.getItem(pinnedKey)) || [];
  }

  #isShowingPinnedOnly() {
    return JSON.parse(localStorage.getItem(pinsOnlyKey)) || false;
  }
}
