# frozen_string_literal: true

# Renders the scale degrees with a play button to play the scale
class DegreesScaleComponent < ViewComponent::Base
  NOTE_IN_SCALE_CLASS = 'bg-gray-300'
  NOTE_NOT_IN_SCALE_CLASS = 'text-gray-300'
  FIRST_POSITION = 0
  LAST_POSITION = 12

  def initialize(scale:, chromatic_scale:)
    @scale = scale
    @chromatic_scale = chromatic_scale
  end

  def note_class(position)
    [FIRST_POSITION, LAST_POSITION].include?(position) || in_scale?(position) ? NOTE_IN_SCALE_CLASS : NOTE_NOT_IN_SCALE_CLASS
  end

  private

  def in_scale?(position)
    @scale.binary_number[position] == '1'
  end
end
