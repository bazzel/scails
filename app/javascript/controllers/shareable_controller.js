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
    this.urlTarget.value = encodeURI(this.shareableUrl);
  }

  #showSnackbar() {
    this.simpleSnackbarComponentOutlet.setMessage(this.snackbarMessageValue);
    this.simpleSnackbarComponentOutlet.show();
  }

  get shareableUrl() {
    const href = new URL(window.location.href);
    const hash = this.modeNumberValue;
    const rootNoteKey = "scale_settings[root_note]";
    const rootNoteValue = href.searchParams.get(rootNoteKey);
    const shareableParams =
      rootNoteValue !== null ? `?${rootNoteKey}=${rootNoteValue}` : "";
    const url = `${href.origin}/${shareableParams}#${hash}`;
    // debugger;
    return encodeURI(url);
  }
}
