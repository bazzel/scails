import { Controller } from "@hotwired/stimulus";
import { useIntersection } from "stimulus-use";

import {
  dismissSnackbarAfter as dismissAfter,
  fadeOutSnackbarDuration as fadeOutDuration,
} from "../variables";

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
