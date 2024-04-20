# frozen_string_literal: true

class SnackbarComponent < ViewComponent::Base
  def initialize(message:, invoke_on_connect: true)
    @message = message
    @invoke_on_connect = invoke_on_connect
  end
end
