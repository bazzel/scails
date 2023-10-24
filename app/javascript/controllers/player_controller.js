import { Controller } from "@hotwired/stimulus";
import Tone from "tone";

export default class extends Controller {
  static values = {
    modeNumber: Number,
  };

  connect() {}

  playNote() {
    const synth = new Tone.Synth().toDestination();
    const now = Tone.now();
    const notes = this.playableNotes();
    const length = 0.4;

    for (const [index, element] of notes.entries()) {
      synth.triggerAttackRelease(`${element}4`, "8n", now + index * length);
    }
    synth.triggerAttackRelease(
      `${notes[0]}5`,
      "8n",
      now + notes.length * length
    );
  }

  playableNotes() {
    let arr = [];

    for (const [index, element] of this.binaryScale.entries()) {
      if (element == 1) {
        arr.push(this.allNotes[index]);
      }
    }

    return arr;
  }

  get binaryScale() {
    return Number(this.modeNumberValue).toString(2).split("");
  }

  get allNotes() {
    return ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  }
}
