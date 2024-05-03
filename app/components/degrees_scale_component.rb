# frozen_string_literal: true

# Renders the scale degrees with a play button to play the scale
class DegreesScaleComponent < ViewComponent::Base
  NOTE_IN_SCALE_CLASS = 'md:bg-surface-container-high md:font-normal'
  NOTE_NOT_IN_SCALE_CLASS = 'text-surface-dim md:bg-surface-container-lowest md:blur-[2px] hover:blur-none md:opacity-50 hover:opacity-100 transition'
  FIRST_POSITION = 0
  LAST_POSITION = 12

  delegate :tempo, :loop, :chromatic_scale, :pattern_name, to: :@scale_settings

  def initialize(scale:, scale_settings:)
    @scale = scale
    @scale_settings = scale_settings
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
