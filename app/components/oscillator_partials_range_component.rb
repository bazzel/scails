# frozen_string_literal: true

class OscillatorPartialsRangeComponent < ViewComponent::Base
  def initialize(form:, partials_range:)
    @form = form
    @partials_range = partials_range
  end
end
