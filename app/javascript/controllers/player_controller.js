import { Controller } from "@hotwired/stimulus";
import Tone from "tone";

export default class extends Controller {
  static values = {
    modeNumber: Number,
  };
  static targets = ["note", "playButton", "pauseButton"];

  initialize() {
    this.pattern = new Tone.Pattern();
  }

  play() {
    const synth = this.#getSynth();
    const scale = this.#getScale();
    const patternName = "up"; // https://tonejs.github.io/docs/14.7.77/type/PatternName

    let counter = 0;

    this.#showPlayStatus();

    this.pattern.start();
    this.pattern.callback = (time, note) =>
      synth.triggerAttackRelease(note, "4n", time);
    this.pattern.pattern = patternName;
    this.pattern.values = scale;
    this.pattern.iterations = scale.length;

    Tone.Transport.bpm.value = 120;
    Tone.Transport.start();
  }

  stop() {
    this.pattern.stop();
    this.#showStopStatus();
  }

  #showPlayStatus() {
    this.playButtonTarget.style.display = "none";
    this.pauseButtonTarget.style.display = "block";
  }

  #showStopStatus() {
    this.playButtonTarget.style.display = "block";
    this.pauseButtonTarget.style.display = "none";
  }

  #getSynth() {
    return new Tone.Synth({
      oscillator: { type: "square16" },
      onsilence: (_instrument) => this.stop(),
      // oscillator: { type: "fmsquare16" },
      // oscillator: { type: "amsquare16" },
      // oscillator: { type: "fatsquare16" },
    }).toDestination();
  }

  #getScale() {
    const allNotes = this.#allNotes;
    const notes = this.#playableNotes();
    const middleC = allNotes.indexOf("C");

    let octaveNumber;

    const scale = notes.map((element) => {
      const chromaticNote = allNotes.indexOf(element);
      octaveNumber = chromaticNote < middleC ? 3 : 4;
      return `${element}${octaveNumber}`;
    });

    if (middleC == 0) octaveNumber = 5;

    const note = `${notes[0]}${octaveNumber}`;
    scale.push(note);

    return scale;
  }

  #playableNotes() {
    const allNotes = this.#allNotes;
    let arr = [];

    for (const [index, element] of this.#binaryScale.entries()) {
      if (element == 1) {
        arr.push(allNotes[index]);
      }
    }

    return arr;
  }

  get #binaryScale() {
    return Number(this.modeNumberValue).toString(2).split("");
  }

  get #allNotes() {
    return this.noteTargets.map((element) => element.textContent.trim());
  }
}
