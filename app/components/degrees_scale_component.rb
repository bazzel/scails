# frozen_string_literal: true

# Renders the scale degrees with a play button to play the scale
class DegreesScaleComponent < ViewComponent::Base
  NOTE_IN_SCALE_CLASS = 'md:bg-surface-container-high md:font-normal transition'
  NOTE_NOT_IN_SCALE_CLASS = 'text-surface-dim md:bg-surface-container-lowest md:blur-[2px] hover:blur-none md:opacity-50 hover:opacity-100 transition'
  FIRST_POSITION = 0
  LAST_POSITION = 12

  delegate :tempo, :loop, :chromatic_scale, :pattern_name, :wave, :prefix, :partials_range, to: :@scale_settings

  def initialize(scale:, scale_settings:)
    @scale = scale
    @scale_settings = scale_settings
  end

  def note_class(position)
    if note_in_scale?(position)
      NOTE_IN_SCALE_CLASS
    else
      NOTE_NOT_IN_SCALE_CLASS
    end
  end

  # Used with 'tag.attributes' this method results in a 'list' of html-attributes:
  # => note_attributes(0) => { class: 'w-10 flex...', data: { player_target: 'note' } }
  #   <div <%= tag.attributes(note_attributes(0)) %>... => <div class="w-10 flex..." data-player-target="note"...>
  def note_attributes(position)
    class_names = %w[w-8 md:w-10 flex justify-center items-center rounded-md md:border md:border-outline-variant]
    class_names << note_class(position)

    { class: class_names.join(' ') }.tap do |h|
      h[:data] = note_data_attributes(position)
    end
  end

  private

  def note_data_attributes(position)
    return unless note_in_scale?(position)

    note_target_data_attribute.merge(note_name_data_attribute(position))
  end

  def note_target_data_attribute
    player_target = 'note'

    { player_target: }
  end

  def note_name_data_attribute(position)
    note_wo_octave_number = chromatic_scale[position]
    octave_number = octave_number(note_wo_octave_number, position)
    note_name = note_wo_octave_number + octave_number

    { note_name: }
  end

  def note_in_scale?(position)
    [FIRST_POSITION,
     LAST_POSITION].include?(position) || in_scale?(position)
  end

  def in_scale?(position)
    @scale.binary_number[position] == '1'
  end

  def middle_c
    chromatic_scale.index('C')
  end

  def octave_number(note_name, position)
    octave_number = chromatic_note(note_name) < middle_c ? 3 : 4
    octave_number += 1 if position == LAST_POSITION
    octave_number.to_s
  end

  def chromatic_note(note_name)
    chromatic_scale.index(note_name)
  end
end
