import { Controller } from "@hotwired/stimulus";
import { deletedKey } from "../variables";

export default class extends Controller {
  static values = {
    modeNumber: Number,
  };
  static classes = ["hidden"];

  connect() {
    const isDeleted = this.#getDeleted().includes(this.modeNumberValue);

    if (isDeleted) {
      this.#removeFromDOM();
      this.#updateURL();
    }
  }

  updateLocalStorage() {
    const deleted = this.#getDeleted();

    deleted.push(this.modeNumberValue);
    localStorage.setItem(deletedKey, JSON.stringify([...new Set(deleted)]));
  }

  #getDeleted() {
    return JSON.parse(localStorage.getItem(deletedKey)) || [];
  }

  #removeFromDOM() {
    this.element.remove();
  }

  #updateURL() {
    const name = "excluded[]";
    const url = new URL(window.location.href);
    const params = url.searchParams;

    if (params.getAll(name).includes(this.modeNumberValue.toString())) return;

    params.append(name, this.modeNumberValue);
    window.history.pushState({}, "", url);
  }
}
