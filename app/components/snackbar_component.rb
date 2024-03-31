# frozen_string_literal: true

class SnackbarComponent < ViewComponent::Base
  def initialize(message:)
    @message = message
  end
end
