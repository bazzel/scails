# frozen_string_literal: true

class EnharmonicCalculator < ActiveInteraction::Base
  NOTES = %w[C C# D D# E F F# G G# A A# B].freeze
  ENHARMONIC_EQUIVALENTS_1 = %w[B# Bx Cx Eb Dx E# Ex Abb Ab Gx Bb Ax].freeze
  ENHARMONIC_EQUIVALENTS_2 = ['Dbb', 'Db', 'Ebb', 'Fbb', 'Fb', 'Gbb', 'Gb', 'Fx', nil, 'Bbb', 'Cbb', 'Cb'].freeze

  TOO_MANY_NOTES = 7

  # b = ♭
  # # = ♯
  # x = 𝄪

  object :scale

  def execute
    enharmonizable? ? enharmonize(scale.playable_notes) : scale.playable_notes
  end

  def enharmonizable?
    # An enharmonic equivalent can only be found if the scale
    # has 8 or fewer notes (last root note included).
    scale.playable_notes_count <= TOO_MANY_NOTES
  end

  def enharmonize(notes, index = 0)
    return notes if index == (notes.size - 1)

    replace_note_with_enharmonic(notes, index) if duplicate_notes?(notes, index)
    enharmonize(notes, index + 1)
  end

  private

  def duplicate_notes?(notes, index)
    current_note = notes[index]

    return false if current_note.nil?

    current_note_wo_accidental = current_note.first
    duplicate_notes_indices = notes[1..].map.with_index do |note, i|
      note&.start_with?(current_note_wo_accidental.to_s) ? i : nil
    end
    duplicate_notes_indices.compact.count > 1
  end

  def replace_note_with_enharmonic(notes, index)
    current_note = notes[index]
    next_note = notes[index + 1]

    if NOTES[index + 1] == next_note
      notes[index + 1] = ENHARMONIC_EQUIVALENTS_1[index + 1]
    elsif ENHARMONIC_EQUIVALENTS_1[index] == current_note
      notes[index] = ENHARMONIC_EQUIVALENTS_2[index]
    end
  end
end
