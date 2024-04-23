# frozen_string_literal: true

class SnackbarComponent < ViewComponent::Base
  HIDDEN_CLASS = 'hidden'

  renders_one :action, Snackbar::ActionComponent

  def initialize(message:, close_button: true, show_on_render: true)
    @message = message
    @close_button = close_button
    @show_on_render = show_on_render
  end

  def container_class
    return if @show_on_render

    HIDDEN_CLASS
  end
end
