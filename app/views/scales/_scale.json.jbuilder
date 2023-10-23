# frozen_string_literal: true

json.extract! scale, :id, :mode_number, :scale, :common_name, :created_at, :updated_at
json.url scale_url(scale, format: :json)
