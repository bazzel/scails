# frozen_string_literal: true

class SnackbarComponent < ViewComponent::Base
  renders_one :action, Snackbar::ActionComponent

  def initialize(message:, close_button: true)
    @message = message
    @close_button = close_button
  end

  def component_class_names
    class_names(class_names_args)
  end

  private

  def class_names_args
    ['fixed z-10 flex items-center justify-between h-12 pl-4 rounded shadow-md
    bg-inverse-surface pe-2 bottom-5 left-5 right-5 sm:w-full sm:max-w-lg', 'z-50']
  end
end
