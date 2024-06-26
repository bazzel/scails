import { Controller } from "@hotwired/stimulus";
import { useIntersection } from "stimulus-use";

import {
  dismissSnackbarAfter as dismissAfter,
  fadeOutSnackbarDuration as fadeOutDuration,
} from "custom/variables";

export default class SnackbarComponentController extends Controller {
  static classes = ["hidden", "visible", "fadingOut"];

  connect() {
    useIntersection(this);
  }

  appear(_entry, _observer) {
    this.invokeDismissal();
  }

  disappear(_entry, _observer) {
    this.element.remove();
  }

  show() {
    this.element.classList.remove(...this.hiddenClasses);
    this.element.classList.add(...this.visibleClasses);
  }

  invokeDismissal() {
    setTimeout(() => {
      if (this.element) this.close();
    }, dismissAfter);
  }

  close() {
    this.element.classList.remove(...this.visibleClasses);
    this.element.classList.add(...this.fadingOutClasses);

    setTimeout(() => {
      this.element.classList.add(...this.hiddenClasses);
    }, fadeOutDuration);
  }
}
