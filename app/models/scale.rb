# frozen_string_literal: true

class Scale < ApplicationRecord
  NOTES = %w[C C# D D# E F F# G G# A A# B].freeze
  MIDDLE_C = 'C'

  def binary_number
    mode_number.to_s(2)
  end

  def playable_notes_count
    binary_number.count('1')
  end

  # Returns an array of 12 elements, containing the note played or nil.
  # => ["C", nil, "D", "D#", "E", nil, nil, "G", nil, "A", nil, nil]
  def playable_notes(root_note = MIDDLE_C)
    playable_notes_array_with_flats = scale[1..].chars.map(&:presence)
    missing_number_of_empty_notes = NOTES.size - playable_notes_array_with_flats.size
    playable_notes_array_with_flats += Array.new(missing_number_of_empty_notes)
    chromatic_notes = ChromaticScale.run!(root_note:)

    playable_notes_array_with_flats.zip(chromatic_notes).map do |notes|
      notes[0].blank? ? nil : notes[1]
    end
  end

  def enharmonic_equivalents(root_note = MIDDLE_C)
    @enharmonic_equivalents ||= EnharmonicCalculator.run(scale: self, root_note:).result
  end
end
