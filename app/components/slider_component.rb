# frozen_string_literal: true

class SliderComponent < ViewComponent::Base
  delegate :range, :loop, :step, to: :@scale_settings

  def initialize(form:, scale_settings:)
    @form = form
    @scale_settings = scale_settings
  end

  def track_dots_count
    (((range.max - range.min) / step) + 1).to_i
  end
end
