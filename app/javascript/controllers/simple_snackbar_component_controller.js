import SnackbarComponentController from "./snackbar_component_controller";

export default class extends SnackbarComponentController {
  static targets = ["message"];

  disappear(_entry, _observer) {
    // override parent behaviour
  }

  setMessage(message) {
    this.messageTarget.textContent = message;
  }
}
