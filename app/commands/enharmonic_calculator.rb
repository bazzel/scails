# frozen_string_literal: true

class EnharmonicCalculator < ActiveInteraction::Base
  NOTES = %w[C C# D D# E F F# G G# A A# B].freeze
  ENHARMONIC_EQUIVALENTS_1 = %w[B# Bx Cx Eb Dx E# Ex Abb Ab Gx Bb Ax].freeze
  ENHARMONIC_EQUIVALENTS_2 = ['Dbb', 'Db', 'Ebb', 'Fbb', 'Fb', 'Gbb', 'Gb', 'Fx', nil, 'Bbb', 'Cbb', 'Cb'].freeze
  MIDDLE_C = 'C'
  TOO_MANY_NOTES = 7

  object :scale
  string :root_note, default: MIDDLE_C

  def execute
    enharmonizable? ? enharmonized_notes : playable_notes
  end

  private

  def enharmonizable?
    # An enharmonic equivalent can only be found if the scale
    # has 7 or fewer notes.
    scale.playable_notes_count <= TOO_MANY_NOTES
  end

  def enharmonized_notes(notes = [])
    return notes if notes.size == playable_notes.size

    current_note = playable_notes[notes.size]
    enharmonized_note = enharmonize_note(current_note, notes)

    enharmonized_notes(notes << enharmonized_note)
  end

  def playable_notes
    scale.playable_notes(root_note)
  end

  def enharmonize_note(note, notes)
    return nil if note.nil?

    enharmonized_note = note

    if (minor_scale? && sharpened?(enharmonized_note)) || duplicate?(enharmonized_note, notes)
      enharmonized_note = ENHARMONIC_EQUIVALENTS_1[NOTES.index(note)]
      enharmonized_note = ENHARMONIC_EQUIVALENTS_2[NOTES.index(note)] if still_sharpened?(enharmonized_note)
    end

    enharmonized_note
  end

  def minor_scale?
    playable_notes[3] && playable_notes[4].nil?
  end

  def sharpened?(note)
    note[-1] =~ /[#x]/
  end

  alias still_sharpened? sharpened?

  def duplicate?(note, notes)
    notes.map { |n| n&.first }.include?(note.first)
  end
end
