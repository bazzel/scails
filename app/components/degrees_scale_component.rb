# frozen_string_literal: true

# Renders the scale degrees with a play button to play the scale
class DegreesScaleComponent < ViewComponent::Base
  NOTE_IN_SCALE_CLASS = 'bg-gray-300 dark:bg-gray-200 dark:text-gray-800'
  NOTE_NOT_IN_SCALE_CLASS = 'text-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-600'
  FIRST_POSITION = 0
  LAST_POSITION = 12

  def initialize(scale:, chromatic_scale:)
    @scale = scale
    @chromatic_scale = chromatic_scale
  end

  def note_class(position)
    if [FIRST_POSITION,
        LAST_POSITION].include?(position) || in_scale?(position)
      NOTE_IN_SCALE_CLASS
    else
      NOTE_NOT_IN_SCALE_CLASS
    end
  end

  private

  def in_scale?(position)
    @scale.binary_number[position] == '1'
  end
end
