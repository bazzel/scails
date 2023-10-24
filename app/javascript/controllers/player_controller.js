import { Controller } from "@hotwired/stimulus";
import Tone from "tone";

export default class extends Controller {
  connect() {}

  playNote() {
    const synth = new Tone.Synth().toDestination();
    const now = Tone.now();

    synth.triggerAttackRelease("C4", "8n");
    synth.triggerAttackRelease("D4", "8n", now + 1 * 0.5);
    synth.triggerAttackRelease("E4", "8n", now + 2 * 0.5);
    synth.triggerAttackRelease("F4", "8n", now + 3 * 0.5);
    synth.triggerAttackRelease("G4", "8n", now + 4 * 0.5);
    synth.triggerAttackRelease("A4", "8n", now + 5 * 0.5);
    synth.triggerAttackRelease("B4", "8n", now + 6 * 0.5);
    synth.triggerAttackRelease("C5", "8n", now + 7 * 0.5);
  }

  static get allNotes() {
    return ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  }
}
