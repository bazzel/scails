import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["dialog", "backdrop", "form"];
  static classes = ["visible", "hidden"];

  toggle(event, skipCheck = false) {
    if (
      skipCheck ||
      event.key === "Escape" ||
      event.target === event.currentTarget
    ) {
      this.dialogTarget.classList.toggle(this.hiddenClass);
      this.backdropTarget.classList.toggle(this.hiddenClass);
      this.dialogTarget.classList.toggle(this.visibleClass);
      this.backdropTarget.classList.toggle(this.visibleClass);
    }
  }

  open(event) {
    if (this.dialogTarget.classList.contains(this.hiddenClass)) {
      this.toggle(event, true);
    }
  }

  close(event) {
    event.preventDefault();

    if (this.dialogTarget.classList.contains(this.visibleClass)) {
      this.toggle(event, true);
      location.reload();
    }
  }

  submitForm(event) {
    if (this.hasFormTarget) {
      this.formTarget.submit();
    }
  }
}
