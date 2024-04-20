# frozen_string_literal: true

class ScalesController < ApplicationController
  # GET /scales or /scales.json
  def index
    # http://127.0.0.1:3000/?excluded_mode_numbers[]=4095&excluded_mode_numbers[]=2773
    @scales = Scale.order(:id).where.not(mode_number: params[:excluded_mode_numbers])
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
