import { Controller } from "@hotwired/stimulus";
import { useIntersection } from "stimulus-use";

export default class extends Controller {
  static targets = ["input", "trackDot", "valueIndicator"];

  connect() {
    useIntersection(this);
  }

  appear(entry, observer) {
    // Calling updateValues() here also makes
    // sure that the values are updated when the
    // form containing the slider is reset
    // (and thus this controller is NOT disconnected).
    this.updateValues();
  }

  disappear(entry, observer) {
    console.log("disappear", entry, observer);
  }

  updateValues() {
    this.updateProgressIndicator();
    this.updateValueIndicator();
  }

  updateProgressIndicator() {
    const ratio = this.ratio;
    const trackDotTargets = this.trackDotTargets;

    this.inputTarget.style.setProperty("--ratio", this.ratioAsPercentage);

    trackDotTargets.forEach((element, index) => {
      const progress = index / (trackDotTargets.length - 1);
      const isRatioGreaterOrEqual = progress >= ratio;

      element.className = isRatioGreaterOrEqual
        ? "text-primary"
        : "text-primary-container";
    });
  }

  updateValueIndicator() {
    const offset = `calc(${this.ratioAsPercentage})`;
    this.valueIndicatorTarget.textContent = this.inputTarget.value;
    this.valueIndicatorTarget.style.setProperty("--offset", offset);
  }

  get ratio() {
    const range = this.inputTarget.max - this.inputTarget.min;
    const ratio = (this.inputTarget.value - this.inputTarget.min) / range;

    return ratio;
  }

  get ratioAsPercentage() {
    return `${this.ratio * 100}%`;
  }

  toggleValueIndicator() {
    this.valueIndicatorTarget.classList.toggle("opacity-0");
    this.valueIndicatorTarget.classList.toggle("scale-50");
    this.valueIndicatorTarget.classList.toggle("translate-y-3");
  }
}
