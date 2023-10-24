import { Controller } from "@hotwired/stimulus";
import Tone from "tone";

export default class extends Controller {
  static values = {
    modeNumber: Number,
  };

  initialize() {
    this.isPlaying = false;
  }

  playNote() {
    if (!this.isPlaying) {
      const synth = new Tone.Synth({
        onsilence: () => (this.isPlaying = false),
      }).toDestination();
      const now = Tone.now();
      const notes = this.playableNotes();
      const length = 0.2;
      const subdivision = "8n";

      this.isPlaying = true;

      for (const [index, element] of notes.entries()) {
        const note = `${element}4`;
        const time = now + index * length;
        synth.triggerAttackRelease(note, subdivision, time);
      }

      const note = `${notes[0]}5`;
      const time = now + notes.length * length;
      synth.triggerAttackRelease(note, subdivision, time);
    }
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
