# frozen_string_literal: true

# :nodoc:
class ScalesController < ApplicationController
  # GET /scales or /scales.json
  def index
    @scales = Scale.all
  end
end
