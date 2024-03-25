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
    if (!this.isPlaying) {
      const synth = new Tone.Synth({
        onsilence: () => (this.isPlaying = false),
      }).toDestination();
      const now = Tone.now();
      const allNotes = this.allNotes;
      const notes = this.playableNotes();
      const length = 0.2;
      const subdivision = "8n";
      const c4 = allNotes.indexOf("C");
      let octaveNumber;

      this.isPlaying = true;

      for (const [index, element] of notes.entries()) {
        const chromaticNote = allNotes.indexOf(element);
        octaveNumber = chromaticNote < c4 ? 3 : 4;

        const note = `${element}${octaveNumber}`;
        const time = now + index * length;

        synth.triggerAttackRelease(note, subdivision, time);
      }

      if (c4 == 0) octaveNumber = 5;
      const note = `${notes[0]}${octaveNumber}`;
      const time = now + notes.length * length;
      synth.triggerAttackRelease(note, subdivision, time);
    }
  }

  playableNotes() {
    const allNotes = this.allNotes;
    let arr = [];

    for (const [index, element] of this.binaryScale.entries()) {
      if (element == 1) {
        arr.push(allNotes[index]);
      }
    }

    return arr;
  }

  get binaryScale() {
    return Number(this.modeNumberValue).toString(2).split("");
  }

  get allNotes() {
    return this.noteTargets.map((element) => element.textContent);
  }
}
