# frozen_string_literal: true

class ModalComponent < ViewComponent::Base
  renders_one :controller, Modal::ControllerComponent
  renders_one :body, Modal::BodyComponent
  renders_one :footer, Modal::BodyComponent

  def initialize(title:)
    @title = title
  end
end
