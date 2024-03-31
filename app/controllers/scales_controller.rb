# frozen_string_literal: true

class ScalesController < ApplicationController
  # GET /scales or /scales.json
  def index
    @scales = Scale.all
    @chromatic_scale = ChromaticScale.run!(root_note: params[:root_note])

    return if params[:root_note].blank?

    flash.now[:notice] = "Showing scales for #{params[:root_note]}"
  end
end
