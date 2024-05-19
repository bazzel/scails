import { Controller } from "@hotwired/stimulus";
import { deletedKey } from "custom/variables";

export default class extends Controller {
  static values = {
    modeNumber: Number,
  };

  undo() {
    const deleted = this.#getDeleted();
    const index = deleted.indexOf(this.modeNumberValue);

    if (index === -1) return;

    deleted.splice(index, 1);
    localStorage.setItem(deletedKey, JSON.stringify(deleted));
  }

  #getDeleted() {
    return JSON.parse(localStorage.getItem(deletedKey)) || [];
  }
}
