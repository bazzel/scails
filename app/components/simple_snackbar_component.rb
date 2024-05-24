# frozen_string_literal: true

class SimpleSnackbarComponent < SnackbarComponent
  # The message for the snackbar should be set at runtime
  #  and is therefore not set in the initializer
  def initialize(close_button: true)
    @close_button = close_button
  end

  private

  def class_names_args
    super + [
      'simple-snackbar-component', { hidden: !@visible }
    ]
  end
end
