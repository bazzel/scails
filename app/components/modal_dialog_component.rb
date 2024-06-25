# frozen_string_literal: true

class ModalDialogComponent < ViewComponent::Base
  renders_one :controller, ModalDialog::ControllerComponent
  renders_one :body, ModalDialog::BodyComponent
  renders_one :footer, ModalDialog::FooterComponent

  def initialize(title:)
    @title = title
  end

end
