import { Controller } from "@hotwired/stimulus";

const lightTextColor = "text-primary-100";
const darkTextColor = "text-primary-500";

export default class extends Controller {
  static targets = ["input", "stopIndicator"];

  connect() {
    this.updateProgressIndicator();
  }

  updateProgressIndicator() {
    const ratio = this.ratio;
    const stopIndicatorTargets = this.stopIndicatorTargets;

    this.inputTarget.style.setProperty("--ratio", this.ratioAsPercentage);

    stopIndicatorTargets.forEach((element, index) => {
      const progress = index / (stopIndicatorTargets.length - 1);
      const isRatioGreaterOrEqual = progress >= ratio;

      console.log(isRatioGreaterOrEqual);
      element.className = "";

      if (isRatioGreaterOrEqual) {
        element.classList.add(darkTextColor, `dark:${lightTextColor}`);
      } else {
        element.classList.add(lightTextColor, `dark:${darkTextColor}`);
      }
    });
  }

  get ratio() {
    const range = this.inputTarget.max - this.inputTarget.min;
    const ratio = (this.inputTarget.value - this.inputTarget.min) / range;

    return ratio;
  }

  get ratioAsPercentage() {
    return `${this.ratio * 100}%`;
  }
}
