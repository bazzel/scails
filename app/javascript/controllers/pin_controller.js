import { Controller } from "@hotwired/stimulus";
import { startViewTransition } from "../utils";

const pinnedKey = "pinned";
const visibilityClass = "!visible";

export default class extends Controller {
  static targets = ["checkbox", "pinContainer"];
  static values = {
    modeNumber: Number,
  };
  static classes = ["shown", "hidden"];

  connect() {
    if (this.#isPinned()) {
      this.checkboxTarget.checked = true;
      this.#makePinVisible();
    }
  }

  addOrRemovePin() {
    const pinned = this.#getPinned();
    const index = this.#pinIndex();

    if (this.#isPinned()) {
      pinned.splice(index, 1);
      this.#makePinInvisible();
      this.#makeScaleInvisible();
    } else {
      pinned.push(this.modeNumberValue);
      this.#makePinVisible();
    }

    localStorage.setItem(pinnedKey, JSON.stringify(pinned));
  }

  #isPinned() {
    return this.#pinIndex() > -1;
  }

  #pinIndex() {
    return this.#getPinned().indexOf(this.modeNumberValue);
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

  #getPinned() {
    return JSON.parse(localStorage.getItem(pinnedKey)) || [];
  }
}
