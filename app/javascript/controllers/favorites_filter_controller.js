import { Controller } from "@hotwired/stimulus";

const isShowingFavoritesOnlyKey = "isShowingFavorites";
const favoritesKey = "favorites";

export default class extends Controller {
  static outlets = ["favorite"];

  connect() {
    console.log("FavoritesFilterController connected");

    // debugger;
    console.log(this.favoriteOutletElement);
    // this.favoriteOutletElements.forEach((el) => {
    //   // return console.log(el);
    // });
  }

  toggle() {
    const isShowingFavoritesOnly = this.#isShowingFavoritesOnly();

    if (isShowingFavoritesOnly) {
      this.favoriteOutlets.forEach((el) => {
        el.element.classList.remove(el.hiddenClass);
      });
    } else {
      this.favoriteOutlets.forEach((el) => {
        if (this.#getFavorites().indexOf(el.modeNumberValue) > -1) {
          el.element.classList.add(el.shownClass);
        } else {
          el.element.classList.add(el.hiddenClass);
        }
      });
    }

    localStorage.setItem(isShowingFavoritesOnlyKey, !isShowingFavoritesOnly);
  }

  #getFavorites() {
    return JSON.parse(localStorage.getItem(favoritesKey)) || [];
  }

  #isShowingFavoritesOnly() {
    return JSON.parse(localStorage.getItem(isShowingFavoritesOnlyKey)) || false;
  }

  #favoriteIndex() {
    return this.#getFavorites().indexOf(this.modeNumberValue);
  }
}
