import { Controller } from "@hotwired/stimulus";

const favoritesOnlyKey = "favoritesOnly";
const favoritesKey = "favorites";

export default class extends Controller {
  static targets = ["checkbox"];
  static outlets = ["favorite"];

  connect() {
    this.restoreFilter();
  }

  restoreFilter() {
    const isShowingFavoritesOnly = this.#isShowingFavoritesOnly();

    if (isShowingFavoritesOnly) {
      this.#showFavoritesOnly();
    } else {
      this.#showAll();
    }

    this.checkboxTarget.checked = isShowingFavoritesOnly;
  }

  toggle() {
    localStorage.setItem(favoritesOnlyKey, !this.#isShowingFavoritesOnly());
    this.restoreFilter();
  }

  #showAll() {
    this.favoriteOutlets.forEach((outlet) =>
      outlet.element.classList.remove(outlet.hiddenClass)
    );
  }

  #showFavoritesOnly() {
    this.favoriteOutlets
      .filter(
        (outlet) => !this.#getFavorites().includes(outlet.modeNumberValue)
      )
      .forEach((outlet) => outlet.element.classList.add(outlet.hiddenClass));
  }

  #getFavorites() {
    return JSON.parse(localStorage.getItem(favoritesKey)) || [];
  }

  #isShowingFavoritesOnly() {
    return JSON.parse(localStorage.getItem(favoritesOnlyKey)) || false;
  }
}
