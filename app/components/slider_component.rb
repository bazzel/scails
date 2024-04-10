# frozen_string_literal: true

class SliderComponent < ViewComponent::Base
  def initialize(value:, range:, step:)
    @value = value
    @range = range
    @step = step
  end
  
  def stopIndicatorsCount
  (((@range.max - @range.min) / @step) + 1).to_i
  end

end
