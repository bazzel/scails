import { Controller } from "@hotwired/stimulus";

const favoritesKey = "favorites";

export default class extends Controller {
  static targets = ["checkbox"];
  static values = {
    modeNumber: Number,
  };
  static classes = ["shown", "hidden"];

  connect() {
    this.checkboxTarget.checked = this.#isFavorite();
  }

  addOrRemoveFavorite() {
    const favorites = this.#getFavorites();
    const index = this.#favoriteIndex();

    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(this.modeNumberValue);
    }

    localStorage.setItem(favoritesKey, JSON.stringify(favorites));
  }

  #isFavorite() {
    return this.#favoriteIndex() > -1;
  }

  #getFavorites() {
    return JSON.parse(localStorage.getItem(favoritesKey)) || [];
  }

  #favoriteIndex() {
    return this.#getFavorites().indexOf(this.modeNumberValue);
  }
}
