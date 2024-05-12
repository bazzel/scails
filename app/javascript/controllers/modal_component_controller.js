import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["dialog", "backdrop", "form"];
  static classes = ["visible", "hidden"];

  toggle() {
    this.dialogTarget.classList.toggle(this.hiddenClass);
    this.backdropTarget.classList.toggle(this.hiddenClass);
    this.dialogTarget.classList.toggle(this.visibleClass);
    this.backdropTarget.classList.toggle(this.visibleClass);
  }

  open(event) {
    if (this.dialogTarget.classList.contains(this.hiddenClass)) {
      this.toggle();
    }
  }

  close(event) {
    if (
      event.key === "Escape" ||
      event.target === event.currentTarget ||
      event.currentTarget.dataset.action === "modal-component#close"
    ) {
      event.preventDefault();

      if (this.dialogTarget.classList.contains(this.visibleClass)) {
        this.toggle();

        this.formTarget.reset();
      }
    }
  }

  submitForm(event) {
    if (this.hasFormTarget) {
      this.formTarget.submit();
    }
  }
}
