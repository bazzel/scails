import { Controller } from "@hotwired/stimulus";

const dismissAfter = 3000;
const fadeOutDuration = 1000;

export default class extends Controller {
  connect() {
    setTimeout(() => {
      if (this.element) this.close();
    }, dismissAfter);
  }

  close() {
    this.element.classList.add(
      "opacity-0",
      "transition-opacity",
      `duration-${fadeOutDuration}`
    );
    setTimeout(() => this.element.remove(), fadeOutDuration);
  }
}
