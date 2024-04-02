import { Controller } from "@hotwired/stimulus";
import Tone from "tone";

export default class extends Controller {
  static values = {
    modeNumber: Number,
  };
  static targets = ["note"];

  initialize() {
    this.isPlaying = false;
  }

  playScale() {
    const synth = this.#getSynth();
    const scale = this.#getScale();
    const patternName = "upDown"; // https://tonejs.github.io/docs/14.7.77/type/PatternName

    let counter = 0;

    new Tone.Pattern(
      function (time, note) {
        synth.triggerAttackRelease(note, "4n", time);
        counter++;

        if (counter == scale.length) {
          Tone.Transport.stop();
          Tone.Transport.cancel();
        }
      },
      scale,
      patternName
    ).start(0);

    Tone.Transport.bpm.value = 120;
    Tone.Transport.start("+0.1");
  }

  #getSynth() {
    return new Tone.Synth({
      onsilence: () => (this.isPlaying = false),
      oscillator: { type: "square16" },
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
