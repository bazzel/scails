# frozen_string_literal: true

module ApplicationHelper

  def excluded_fields
    if params.has_key?(:excluded)
      params[:excluded].map do |excluded| 
        hidden_field_tag "excluded[]", excluded 
      end.join.html_safe
    end
  end

end
