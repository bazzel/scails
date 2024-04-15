import { Controller } from "@hotwired/stimulus";

const favoritesOnlyKey = "favoritesOnly";
const favoritesKey = "favorites";

export default class extends Controller {
  static outlets = ["favorite"];

  connect() {
    console.log("FavoritesFilterController connected");
  }

  toggle() {
    const shouldShowAll = this.#shouldShowAll();
    const favorites = this.#getFavorites();

    if (shouldShowAll) {
      this.favoriteOutlets.forEach((outlet) =>
        outlet.element.classList.remove(outlet.hiddenClass)
      );
    } else {
      this.favoriteOutlets
        .filter((outlet) => !favorites.includes(outlet.modeNumberValue))
        .forEach((outlet) => outlet.element.classList.add(outlet.hiddenClass));
    }

    localStorage.setItem(favoritesOnlyKey, !shouldShowAll);
  }

  #getFavorites() {
    return JSON.parse(localStorage.getItem(favoritesKey)) || [];
  }

  #isShowingFavoritesOnly() {
    return JSON.parse(localStorage.getItem(favoritesOnlyKey)) || false;
  }

  #shouldShowAll() {
    return this.#isShowingFavoritesOnly();
  }

  #shouldShowingFavorites() {
    return !this.#shouldShowAll();
  }

  #favoriteIndex() {
    return this.#getFavorites().indexOf(this.modeNumberValue);
  }
}
