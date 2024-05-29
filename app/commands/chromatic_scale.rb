# frozen_string_literal: true

# Returns an array 13 notes, containing the chromatic scale notes starting from the root note.
# It also ends with the root note.
class ChromaticScale < ActiveInteraction::Base
  NOTES = %w[C C# D D# E F F# G G# A A# B].freeze
  string :root_note, default: 'C'

  validates :root_note, inclusion: { in: NOTES }

  def execute
    root_note_index = NOTES.index(root_note)
    NOTES.rotate(root_note_index).append(NOTES[root_note_index])
  end
end
