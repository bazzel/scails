# frozen_string_literal: true

class EnharmonicCalculator < ActiveInteraction::Base
  NOTES = %w[C C# D D# E F F# G G# A A# B].freeze
  ENHARMONIC_EQUIVALENTS_1 = %w[B# Bx Cx Eb Dx E# Ex Abb Ab Gx Bb Ax].freeze
  ENHARMONIC_EQUIVALENTS_2 = ['Dbb', 'Db', 'Ebb', 'Fbb', 'Fb', 'Gbb', 'Gb', 'Fx', nil, 'Bbb', 'Cbb', 'Cb'].freeze

  TOO_MANY_NOTES = 7

  object :scale

  def execute
    enharmonizable? ? enharmonize(scale.playable_notes) : scale.playable_notes
  end

  private

  def enharmonizable?
    # An enharmonic equivalent can only be found if the scale
    # has 8 or fewer notes (last root note included).
    scale.playable_notes_count <= TOO_MANY_NOTES
  end

  def enharmonize(notes, index = 0)
    return notes if end_of_list?(notes, index)

    enharmonized_notes = duplicate_notes?(notes, index) ? replace_note_with_enharmonic(notes, index) : notes
    enharmonize(enharmonized_notes, index + 1)
  end

  def end_of_list?(notes, index)
    index == (notes.size - 1)
  end

  def duplicate_notes?(notes, index)
    return false if current_note(notes, index).nil?

    duplicate_notes_indices(notes, index).compact.count > 1
  end

  def current_note(notes, index)
    notes[index]
  end

  def replace_note_with_enharmonic(notes, index)
    enharmonized_notes = replace_note_using_equivalents(notes:, equivalents: ENHARMONIC_EQUIVALENTS_1, index:)

    if !duplicate_notes?(enharmonized_notes[..index], index) && ordered?(enharmonized_notes, index)
      return enharmonized_notes
    end

    enharmonized_notes = replace_note_using_equivalents(notes:, equivalents: ENHARMONIC_EQUIVALENTS_2, index:)

    if enharmonized_notes[index] && !duplicate_notes?(enharmonized_notes[..index],
                                                      index) && ordered?(enharmonized_notes, index)

      return enharmonized_notes
    end

    notes
  end

  def replace_note_using_equivalents(notes:, equivalents:, index:)
    notes.dup.tap do |enharmonized_notes|
      enharmonized_notes[index] = equivalents[index]
    end
  end

  def ordered?(notes, index)
    current_note = current_note(notes, index)
    compacts = notes.compact

    next_note = compacts[compacts.index(current_note) + 1]

    return true if next_note.nil?

    NOTES.index(next_note.first) >= NOTES.index(current_note.first)
  end

  def duplicate_notes_indices(notes, index)
    current_note_wo_accidental = current_note(notes, index).first

    notes.map.with_index do |note, i|
      note&.start_with?(current_note_wo_accidental.to_s) ? i : nil
    end
  end
end
