# frozen_string_literal: true

# Returns an array 13 notes, containing the chromatic scale notes starting from the root note.
# It also ends with the root note.
class ChromaticScale < ActiveInteraction::Base
  NOTES = %w[C C# D D# E F F# G G# A A# B].freeze
  ENHARMONIC_EQUIVALENTS_1 = %w[B# Bx Cx Eb Dx E# Ex Abb Ab Gx Bb Ax].freeze
  ENHARMONIC_EQUIVALENTS_2 = ['Dbb', 'Db', 'Ebb', 'Fbb', 'Fb', 'Gbb', 'Gb', 'Fx', nil, 'Bbb', 'Cbb', 'Cb'].freeze
  string :root_note, default: 'C'

  # b = ♭
  # # = ♯
  # x = 𝄪

  validates :root_note, inclusion: { in: NOTES }

  def execute
    root_note_index = NOTES.index(root_note)
    NOTES.rotate(root_note_index).append(NOTES[root_note_index])
  end

  def self.enharmonic_equivalent(note)
    index = NOTES.index(note)
    return ENHARMONIC_EQUIVALENTS_1[index] if ENHARMONIC_EQUIVALENTS_1[index]

    ENHARMONIC_EQUIVALENTS_2[index]
  end
end
