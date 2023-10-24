# frozen_string_literal: true

class Scale < ApplicationRecord
  def binary_number
    mode_number.to_s(2)
  end
end
