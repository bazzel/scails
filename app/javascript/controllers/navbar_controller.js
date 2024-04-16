import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static classes = ["waterfall"];
  connect() {
    this.waterfall();
  }

  waterfall() {
    if (window.scrollY > 0) {
      this.element.classList.add(...this.waterfallClasses);
    } else {
      this.element.classList.remove(...this.waterfallClasses);
    }
  }
}
