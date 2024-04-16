import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    // this.element.textContent = "Hello World!"
  }

  static classes = ["waterfall"];

  waterfall() {
    console.log("waterfall");
    if (window.scrollY > 0) {
      this.element.classList.add(this.waterfallClass);
    } else {
      this.element.classList.remove(this.waterfallClass);
    }
  }
}
