import { Controller } from "@hotwired/stimulus";
import { startViewTransition } from "custom/utils";
import { isShowingPinnedOnly, getPinned } from "custom/local_storage";

const visibilityClass = "!visible";

export default class extends Controller {
  static targets = ["checkbox", "pinContainer"];
  static values = {
    modeNumber: Number,
  };
  static classes = ["shown", "hidden"];

  checkboxTargetConnected(target) {
    // Do not execute this in the `connect` method
    // as the target is not yet connected/rendered due
    // to turbo-frame rendering.
    if (this.#isPinned()) {
      this.checkboxTarget.checked = true;
      this.#makePinVisible();
    }
  }

  addOrRemovePin() {
    const pinned = getPinned();
    const index = this.#pinIndex();

    if (this.#isPinned()) {
      pinned.splice(index, 1);
      this.#makePinInvisible();
      if (isShowingPinnedOnly()) this.#makeScaleInvisible();
    } else {
      pinned.push(this.modeNumberValue);
      this.#makePinVisible();
    }
  }

  #isPinned() {
    return this.#pinIndex() > -1;
  }

  #pinIndex() {
    return getPinned().indexOf(this.modeNumberValue);
  }

  #makePinVisible() {
    this.pinContainerTarget.classList.add(visibilityClass);
  }

  #makePinInvisible() {
    this.pinContainerTarget.classList.remove(visibilityClass);
  }

  #makeScaleInvisible() {
    startViewTransition(() =>
      this.element.classList.add(...this.hiddenClasses)
    );
  }
}
