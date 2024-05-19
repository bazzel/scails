import { Controller } from "@hotwired/stimulus";
import { startViewTransition } from "custom/utils";
import { isShowingPinnedOnly, getPinned } from "custom/local_storage";
import { pinsOnlyKey } from "custom/variables";

export default class extends Controller {
  static targets = ["checkbox"];
  static outlets = ["pin"];

  connect() {
    this.restoreFilter();
  }

  restoreFilter() {
    if (isShowingPinnedOnly()) {
      this.#showPinnedOnly();
      this.checkboxTarget.checked = true;
    } else {
      this.#showAll();
    }
  }

  toggle() {
    localStorage.setItem(pinsOnlyKey, !isShowingPinnedOnly());
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
        .filter((outlet) => !getPinned().includes(outlet.modeNumberValue))
        .forEach((outlet) =>
          outlet.element.classList.add(...outlet.hiddenClasses)
        )
    );
  }
}
