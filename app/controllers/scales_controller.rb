# frozen_string_literal: true

class ScalesController < ApplicationController
  ActionController::Parameters.permit_all_parameters = true
  
  # GET /scales or /scales.json
  def index
    @scales = Scale.all
    # TODO: Remove this line
    @chromatic_scale = ChromaticScale.run!(root_note: params[:root_note])
    @pattern_names_and_labels = I18n.t('tonejs.pattern_names').map { |k, v| [v, k] }
    # @pattern_name = params[:pattern_name] || @pattern_names_and_labels.first.last
    # @loop = params[:loop] || false
    # @range = 60..240
    # @tempo = params[:tempo] || (((@range.max - @range.min) / 2) + @range.min)
    @scale_settings = ScaleSettings.new(scale_settings_params)


    return if scale_settings_params.empty? { |key| params.key?(key) }

    # p "scale_settings_params", scale_settings_params

    # p "root_note", @scale_settings.root_note
    # p "tempo", @scale_settings.tempo
    # p "loop", @scale_settings.loop
    # p "range", @scale_settings.range
    # p "scale_settings", @scale_settings.pattern_name
    # p @scale_settings.step


    flash.now[:notice] = 'Settings have been updated.'
  end

  private
  def scale_settings_params
    params.fetch(:scale_settings, {}).permit(:root_note, :tempo, :loop, :pattern_name)
  end
end
