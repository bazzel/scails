import { Controller } from "@hotwired/stimulus";
// import QrCreator from "qr-creator";
import QRCodeStyling from "qr-code-styling";

// Connects to data-controller="shareable"
export default class extends Controller {
  static targets = ["url", "qrCode"];
  static values = {
    modeNumber: Number,
    snackbarMessage: String,
  };
  static outlets = ["simple-snackbar-component"];

  connect() {
    this.#fillInUrl();
    this.#renderQrCode();
  }

  copy() {
    navigator.clipboard.writeText(this.urlTarget.value);
    this.#showSnackbar();
  }

  downloadQrCode() {
    this.qrCode.download();
  }

  #fillInUrl() {
    this.urlTarget.value = encodeURI(this.shareableUrl);
  }

  #renderQrCode() {
    this.qrCode = new QRCodeStyling({
      width: 224,
      height: 224,
      data: this.shareableUrl,
    });

    this.qrCode.append(this.qrCodeTarget);
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
