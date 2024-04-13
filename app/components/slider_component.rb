# frozen_string_literal: true

class SliderComponent < ViewComponent::Base
  def initialize(form:, scale_settings:)
    @form = form
    @scale_settings = scale_settings
  end
  
  def stop_indicators_count
  (((range.max - range.min) / step) + 1).to_i
  end

  def range
    @scale_settings.range
  end

  def step
    @scale_settings.step
  end
end
