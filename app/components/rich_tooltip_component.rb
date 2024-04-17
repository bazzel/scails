# frozen_string_literal: true

class RichTooltipComponent < ViewComponent::Base
  renders_one :tooltip, RichTooltip::TooltipComponent

  POSITIONS = {
    top_right: 'left-full -translate-y-20',
    bottom_right: 'left-full',
    top_left: '-translate-y-20 right-full',
    bottom_left: 'right-full'
  }

  def initialize(position: :bottom_right, title: nil)
    @position = position
    @title = title
  end

  def position_class
    POSITIONS[@position.to_sym]
  end
end
