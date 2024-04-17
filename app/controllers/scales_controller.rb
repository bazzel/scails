# frozen_string_literal: true

class ScalesController < ApplicationController
  # GET /scales or /scales.json
  def index
    @scales = Scale.order(:id)
    @pattern_names_and_labels = I18n.t('tonejs.pattern_names').map { |k, v| [v, k] }
    @scale_settings = ScaleSettings.new(scale_settings_params)

    return if scale_settings_params.empty?

    flash.now[:notice] = 'Settings have been updated.'
  end

  private

  def scale_settings_params
    params.fetch(:scale_settings, {}).permit(:root_note, :tempo, :loop, :pattern_name)
  end
end
