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
    enharmonizable? ? enharmonize : notes
  end

  def enharmonizable?
    # An enharmonic equivalent can only be found if the scale
    # has 8 or fewer notes (last root note included).
    scale.playable_notes_count <= TOO_MANY_NOTES
  end

  def enharmonize(index = 0)
    return notes if index == (notes.size - 1)

    replace_note_with_enharmonic!(index) if duplicate_notes?(index)
    enharmonize(index + 1)
  end

  # private

  def notes
    @notes ||= scale.playable_notes
  end

  def duplicate_notes?(index)
    return false if current_note(index).nil?

    duplicate_notes_indices(index).compact.count > 1
  end

  def current_note(index)
    notes[index]
  end

  def replace_note_with_enharmonic!(index)
    next_note = notes[index + 1]

    if NOTES[index + 1] == next_note
      notes[index + 1] = ENHARMONIC_EQUIVALENTS_1[index + 1]
    elsif ENHARMONIC_EQUIVALENTS_1[index] == current_note(index) # && duplicate_notes_indices(index).compact.max == index
      notes[index] = ENHARMONIC_EQUIVALENTS_2[index]
    end
  end

  def duplicate_notes_indices(index)
    current_note_wo_accidental = current_note(index).first

    notes.map.with_index do |note, i|
      note&.start_with?(current_note_wo_accidental.to_s) ? i : nil
    end
  end
end
