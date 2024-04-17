# frozen_string_literal: true

# Renders the content and show a tooltip on hover.
# ```
# <%= render(PlainTooltipComponent.new(tooltip: "My tooltip")) do %>
#   <h1>Hello World</h1>
# <% end %>
# ```
class PlainTooltipComponent < ViewComponent::Base
  def initialize(tooltip:)
    @tooltip = tooltip
  end
end
