# frozen_string_literal: true

class SnackbarComponent < ViewComponent::Base
  def initialize(message:, close_button: true)
    @message = message
    @close_button = close_button
  end
end
