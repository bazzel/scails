import { Controller } from "@hotwired/stimulus";

const pinnedKey = "pinned";

export default class extends Controller {
  static targets = ["checkbox"];
  static values = {
    modeNumber: Number,
  };
  static classes = ["shown", "hidden"];

  connect() {
    this.checkboxTarget.checked = this.#isPinned();
  }

  addOrRemovePin() {
    const pinned = this.#getPinned();
    const index = this.#pinIndex();

    if (index > -1) {
      pinned.splice(index, 1);
    } else {
      pinned.push(this.modeNumberValue);
    }

    localStorage.setItem(pinnedKey, JSON.stringify(pinned));
  }

  #isPinned() {
    return this.#pinIndex() > -1;
  }

  #getPinned() {
    return JSON.parse(localStorage.getItem(pinnedKey)) || [];
  }

  #pinIndex() {
    return this.#getPinned().indexOf(this.modeNumberValue);
  }
}
