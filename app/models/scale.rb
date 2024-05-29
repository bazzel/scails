# frozen_string_literal: true

class Scale < ApplicationRecord
  NOTES = %w[C C# D D# E F F# G G# A A# B].freeze

  def binary_number
    mode_number.to_s(2)
  end

  def playable_notes_count
    # binary_number.count('1') + 1
    binary_number.count('1')
  end

  # Returns an array of ~~13~~ 12 notes, ending with the root note.
  def playable_notes
    playable_notes_array_with_flats = scale[1..].chars.map(&:presence)
    missing_number_of_empty_notes = NOTES.size - playable_notes_array_with_flats.size
    playable_notes_array_with_flats += Array.new(missing_number_of_empty_notes)
    playable_notes_array_with_flats.zip(NOTES).map do |notes|
      notes[0].blank? ? nil : notes[1]
    end
    # first_note = playable_notes_array_with_sharps.first
    # playable_notes_array_with_sharps << first_note
  end
end
