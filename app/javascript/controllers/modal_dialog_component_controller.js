import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["dialog", "form", "saveButton"];

  connect() {
    this.#adjustHeader();
  }

  open(_event) {
    this.dialogTarget.showModal();
  }

  close(event) {
    event.preventDefault();
    this.dialogTarget.close();

    if (this.hasFormTarget) this.formTarget.reset();
  }

  submitForm(_event) {
    if (this.hasFormTarget) {
      this.formTarget.submit();
    }
  }

  handleClickOnDialog(event) {
    const rect = this.dialogTarget.getBoundingClientRect();
    const isInDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;
    if (!isInDialog) {
      this.close(event);
    }
  }

  #adjustHeader() {
    if (!this.hasFormTarget) {
      this.saveButtonTarget.remove();
    }
  }
}
