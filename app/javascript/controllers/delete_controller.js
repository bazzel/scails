import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="delete"
const deletedKey = "deleted";

export default class extends Controller {
  static values = {
    modeNumber: Number,
  };

  connect() {
    const isDeleted = this.#getDeleted().includes(this.modeNumberValue);

    if (isDeleted) {
      this.#removeFromDOM();
      this.#updateURL();
    }
  }

  deleteScale() {
    const deleted = this.#getDeleted();

    deleted.push(this.modeNumberValue);
    localStorage.setItem(deletedKey, JSON.stringify([...new Set(deleted)]));

    this.#removeFromDOM();
    this.#updateURL();
  }

  #getDeleted() {
    return JSON.parse(localStorage.getItem(deletedKey)) || [];
  }

  #removeFromDOM() {
    this.element.remove();
  }

  #updateURL() {
    const name = "excluded_mode_numbers[]";
    const url = new URL(window.location.href);
    const params = url.searchParams;

    if (params.getAll(name).includes(this.modeNumberValue.toString())) return;

    params.append(name, this.modeNumberValue);
    window.history.pushState({}, "", url);
  }
}
