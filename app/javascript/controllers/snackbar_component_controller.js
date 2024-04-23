import { Controller } from "@hotwired/stimulus";
import { useIntersection } from "stimulus-use";

import {
  dismissSnackbarAfter as dismissAfter,
  fadeOutSnackbarDuration as fadeOutDuration,
} from "../variables";

export default class extends Controller {
  static classes = ["hidden", "visible", "fadingOut"];

  connect() {
    // Check if the component is visible after is it rendered
    // so we now how to restore it after it fading out.
    this.isHidden = this.hasHiddenClass;
    this.element.classList.add(`duration-${fadeOutDuration}`);

    useIntersection(this);
  }

  appear(entry, observer) {
    // this.invokeDismissal();
  }

  invokeDismissal() {
    this.element.classList.remove(...this.fadingOutClasses);
    this.element.classList.add(...this.visibleClasses);

    setTimeout(() => {
      if (this.element) this.close();
    }, dismissAfter);
  }

  close() {
    this.element.classList.remove(...this.visibleClasses);
    this.element.classList.add(...this.fadingOutClasses);

    setTimeout(() => {
      if (this.isHidden) {
        this.element.classList.add(...this.hiddenClasses);
      }

      // this.element.remove();
    }, fadeOutDuration);
  }
}
