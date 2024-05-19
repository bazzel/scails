import { Controller } from "@hotwired/stimulus";
import Tone from "tone";

const hideClass = "none";
const showClass = "inline-flex";
const classNames = ["!bg-tertiary", "!text-on-tertiary"];

export default class extends Controller {
  static values = {
    modeNumber: Number,
    patternName: String,
    loop: Boolean,
    tempo: Number,
    wave: String,
    prefix: String,
    partialsRange: Number,
  };
  static targets = ["note", "playButton", "pauseButton"];

  initialize() {
    this.#showStopStatus();
    this.pattern = new Tone.Pattern();
  }

  play() {
    const synth = this.#getSynth();
    const scale = this.#scale;
    const patternName = this.patternNameValue;
    const iterations = this.#isGoingBackToStart
      ? scale.length * 2 - 1
      : scale.length;

    this.#showPlayStatus();

    this.pattern.start();
    this.pattern.callback = (time, note) => {
      this.#deemphasizeNote();
      this.#emphasizeNote(note);
      synth.triggerAttackRelease(note, "8n", time);
    };
    this.pattern.pattern = patternName;
    this.pattern.values = scale;

    if (!this.loopValue) this.pattern.iterations = iterations;

    Tone.Transport.bpm.value = this.tempoValue;
    Tone.Transport.start();
  }

  stop() {
    this.pattern.stop();
    this.#deemphasizeNote();
    this.#showStopStatus();
  }

  // Private methods
  //
  #showStopStatus() {
    this.playButtonTarget.style.display = showClass;
    this.pauseButtonTarget.style.display = hideClass;
  }

  #getSynth() {
    return new Tone.Synth({
      onsilence: (_instrument) => this.stop(),
      oscillator: { type: this.#oscillatorType },
    }).toDestination();
  }

  #showPlayStatus() {
    this.playButtonTarget.style.display = hideClass;
    this.pauseButtonTarget.style.display = showClass;
  }

  #deemphasizeNote() {
    if (this.emphasizedNote) {
      this.emphasizedNote.classList.remove(...classNames);
    }
  }

  #emphasizeNote(note) {
    this.emphasizedNote = this.noteTargets.find(
      (e) => e.dataset.noteName === note
    );
    this.emphasizedNote.classList.add(...classNames);
  }
  //
  // End private methods

  // Getters
  //
  get #scale() {
    return this.noteTargets.map((e) => e.dataset.noteName);
  }

  get #isGoingBackToStart() {
    const patternNames = ["upDown", "downUp"];
    return patternNames.includes(this.patternNameValue);
  }

  get #oscillatorType() {
    // https://github.com/Tonejs/Tone.js/blob/14.7.39/Tone/source/oscillator/OscillatorInterface.ts`
    const prefix = this.prefixValue === "none" ? "" : this.prefixValue;
    const wave = this.waveValue;
    const partialsRange = this.partialsRangeValue;

    return `${prefix}${wave}${partialsRange}`;
  }
  //
  // End getters
}
