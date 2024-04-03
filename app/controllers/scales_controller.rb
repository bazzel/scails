# frozen_string_literal: true

class ScalesController < ApplicationController
  # GET /scales or /scales.json
  def index
    @scales = Scale.all
    @chromatic_scale = ChromaticScale.run!(root_note: params[:root_note])
    @pattern_names_and_labels = I18n.t('tonejs.pattern_names').map { |k, v| [v, k] }
    @pattern_name = params[:pattern_name] || @pattern_names_and_labels.first.last

    return if %i[root_note pattern_name].none? { |key| params.key?(key) }

    flash.now[:notice] = 'Settings have been updated.'
  end
end
