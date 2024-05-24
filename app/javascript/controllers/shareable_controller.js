import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="shareable"
export default class extends Controller {
  static targets = ["url"];
  static values = {
    modeNumber: Number,
    snackbarMessage: String,
  };
  static outlets = ["simple-snackbar-component"];

  connect() {
    this.#fillInUrl();
  }

  copy() {
    navigator.clipboard.writeText(this.urlTarget.value);
    this.#showSnackbar();
  }

  #fillInUrl() {
    const href = new URL(window.location.href);
    const hash = this.modeNumberValue;
    const url = `${href.origin}/#${hash}`;
    this.urlTarget.value = url;
  }

  #showSnackbar() {
    this.simpleSnackbarComponentOutlet.setMessage(this.snackbarMessageValue);
    this.simpleSnackbarComponentOutlet.show();
  }
}
