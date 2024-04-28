# frozen_string_literal: true

class SnackbarComponent < ViewComponent::Base
  renders_one :action, Snackbar::ActionComponent

  def initialize(message:, close_button: true)
    @message = message
    @close_button = close_button
  end
end
