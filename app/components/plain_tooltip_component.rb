# frozen_string_literal: true

# Renders the content and show a tooltip on hover.
# ```
# <%= render(PlainTooltipComponent.new(tooltip: "My tooltip")) do %>
#   <h1>Hello World</h1>
# <% end %>
# ```
class PlainTooltipComponent < ViewComponent::Base
  POSITIONS = {
    top: 'mb-1 -translate-x-1/2 left-1/2 bottom-full',
    bottom: 'mt-1 -translate-x-1/2 left-1/2 top-full',
    left: 'mr-1 -translate-y-1/2 top-1/2 right-full',
    right: 'ml-1 -translate-y-1/2 top-1/2 left-full'
  }.freeze

  def initialize(tooltip:, position: :top)
    @tooltip = tooltip
    @position = position
  end

  def position_class
    POSITIONS[@position.to_sym]
  end
end
