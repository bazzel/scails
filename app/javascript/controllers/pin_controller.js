import { Controller } from "@hotwired/stimulus";

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
      this.#makeVisible();
    }
  }

  addOrRemovePin() {
    const pinned = this.#getPinned();
    const index = this.#pinIndex();

    if (this.#isPinned()) {
      pinned.splice(index, 1);
      this.#makeInvisible();
    } else {
      pinned.push(this.modeNumberValue);
      this.#makeVisible();
    }

    localStorage.setItem(pinnedKey, JSON.stringify(pinned));
  }

  #isPinned() {
    return this.#pinIndex() > -1;
  }

  #pinIndex() {
    return this.#getPinned().indexOf(this.modeNumberValue);
  }

  #makeVisible() {
    this.pinContainerTarget.classList.add(visibilityClass);
  }

  #makeInvisible() {
    this.pinContainerTarget.classList.remove(visibilityClass);
  }

  #getPinned() {
    return JSON.parse(localStorage.getItem(pinnedKey)) || [];
  }
}
