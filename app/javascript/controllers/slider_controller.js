import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["input", "stopIndicator", "balloon"];

  connect() {
    this.updateValues();
  }

  updateValues() {
    this.updateProgressIndicator();
    this.updateBalloon();
  }

  updateProgressIndicator() {
    const lightTextColor = "text-primary-100";
    const darkTextColor = "text-primary-500";

    const ratio = this.ratio;
    const stopIndicatorTargets = this.stopIndicatorTargets;

    this.inputTarget.style.setProperty("--ratio", this.ratioAsPercentage);

    stopIndicatorTargets.forEach((element, index) => {
      const progress = index / (stopIndicatorTargets.length - 1);
      const isRatioGreaterOrEqual = progress >= ratio;

      element.className = isRatioGreaterOrEqual
        ? `${darkTextColor} dark:${lightTextColor}`
        : `${lightTextColor} dark:${darkTextColor}`;
    });
  }

  updateBalloon() {
    const offset = `calc(${this.ratioAsPercentage})`;
    this.balloonTarget.textContent = this.inputTarget.value;
    this.balloonTarget.style.setProperty("--offset", offset);
  }

  get ratio() {
    const range = this.inputTarget.max - this.inputTarget.min;
    const ratio = (this.inputTarget.value - this.inputTarget.min) / range;

    return ratio;
  }

  get ratioAsPercentage() {
    return `${this.ratio * 100}%`;
  }

  toggleBalloon() {
    this.balloonTarget.classList.toggle("opacity-0");
    this.balloonTarget.classList.toggle("scale-50");
    this.balloonTarget.classList.toggle("translate-y-3");
  }
}
