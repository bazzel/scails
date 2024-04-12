# frozen_string_literal: true

class ScalesController < ApplicationController
  ActionController::Parameters.permit_all_parameters = true
  
  # GET /scales or /scales.json
  def index
    @scales = Scale.all
    @chromatic_scale = ChromaticScale.run!(root_note: params[:root_note])
    @pattern_names_and_labels = I18n.t('tonejs.pattern_names').map { |k, v| [v, k] }
    @pattern_name = params[:pattern_name] || @pattern_names_and_labels.first.last
    @loop = params[:loop] || false
    @range = 60..240
    @tempo = params[:tempo] || (((@range.max - @range.min) / 2) + @range.min)

    p @tempo

    return if %i[root_note pattern_name loop].none? { |key| params.key?(key) }

    flash.now[:notice] = 'Settings have been updated.'
  end
end
