import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = {
    modeNumber: Number,
  };

  connect() {
    console.log("Favorites controller connected");
  }

  addOrRemoveFavorite() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const index = favorites.indexOf(this.modeNumberValue);
    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(this.modeNumberValue);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
}
