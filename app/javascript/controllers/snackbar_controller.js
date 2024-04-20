import { Controller } from "@hotwired/stimulus";
import { useVisibility, useIntersection } from "stimulus-use";

const dismissAfter = 3000;
const fadeOutDuration = 1000;

export default class extends Controller {
  connect() {
    useIntersection(this);
  }

  appear(entry, observer) {
    this.invokeDismissal();
  }

  invokeDismissal() {
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
