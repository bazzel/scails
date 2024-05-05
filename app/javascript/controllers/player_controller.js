import { Controller } from "@hotwired/stimulus";
import Tone from "tone";

const hideClass = "none";
const showClass = "inline-flex";

export default class extends Controller {
  static values = {
    modeNumber: Number,
    patternName: String,
    loop: Boolean,
    tempo: Number,
  };
  static targets = ["note", "playButton", "pauseButton"];

  initialize() {
    this.#showStopStatus();
    this.pattern = new Tone.Pattern();
  }

  play() {
    const synth = this.#getSynth();
    const scale = this.#getScale();
    const patternName = this.patternNameValue;
    const iterations = this.#isGoingBackToStart
      ? scale.length * 2 - 1
      : scale.length;

    this.#showPlayStatus();

    this.pattern.start();
    this.pattern.callback = (time, note) =>
      synth.triggerAttackRelease(note, "8n", time);
    this.pattern.pattern = patternName;
    this.pattern.values = scale;

    if (!this.loopValue) this.pattern.iterations = iterations;

    Tone.Transport.bpm.value = this.tempoValue;
    Tone.Transport.start();
  }

  stop() {
    this.pattern.stop();
    this.#showStopStatus();
  }

  #showPlayStatus() {
    this.playButtonTarget.style.display = hideClass;
    this.pauseButtonTarget.style.display = showClass;
  }

  #showStopStatus() {
    this.playButtonTarget.style.display = showClass;
    this.pauseButtonTarget.style.display = hideClass;
  }

  #getSynth() {
    return new Tone.Synth({
      onsilence: (_instrument) => this.stop(),
      oscillator: { type: "sine16" }, // https://github.com/Tonejs/Tone.js/blob/master/Tone/source/oscillator/OscillatorInterface.ts
      // oscillator: { type: "square16" },
      // oscillator: { type: "sawtooth16" },
      // oscillator: { type: "triangle16" },

      // oscillator: { type: "fmsine16" },
      // oscillator: { type: "fmsquare16" },
      // oscillator: { type: "fmsawtooth16" },
      // oscillator: { type: "fmtriangle16" },

      // oscillator: { type: "amsine16" },
      // oscillator: { type: "amsquare16" },
      // oscillator: { type: "amsawtooth16" },
      // oscillator: { type: "amtriangle16" },

      // oscillator: { type: "fatsine16" },
      // oscillator: { type: "fatsquare16" },
      // oscillator: { type: "fatsawtooth16" },
      // oscillator: { type: "fattriangle16" },
    }).toDestination();
  }

  #getScale() {
    return this.noteTargets.map((e) => e.dataset.noteName);
  }

  get #isGoingBackToStart() {
    const patternNames = ["upDown", "downUp"];
    return patternNames.includes(this.patternNameValue);
  }
}
