# frozen_string_literal: true

class ScalesController < ApplicationController
  # GET /scales or /scales.json
  def index
    @scales = Scale.order(:id).where.not(mode_number: params[:excluded])
    @scale = Scale.find(params[:soft_delete]) if params[:soft_delete]
    @scale_settings = ScaleSettings.new(scale_settings_params)

    return if scale_settings_params.empty?

    flash.now[:notice] = 'Settings have been updated.'
  end

  # POST /scales
  def create
    scale = Scale.find(params[:id])

    if scale
      params.delete(:id)
      remove_mode_number_from_params(scale.mode_number)
    end

    redirect_to scales_path(params.permit!), notice: "#{scale.common_name} scale has been restored."
  end

  # DELETE /scales/:id
  def destroy
    # Since we need the deleted scale in the index action,
    # you can question the need for this action.
    # However, I couldn't find a cleaner way to offer the user
    # with an 'Undo' option.
    scale = Scale.find(params[:id])

    if scale
      params[:soft_delete] = scale.id
      add_mode_number_to_params(scale.mode_number)
    end

    redirect_to scales_path(params.permit!)
  end

  private

  def scale_settings_params
    params.fetch(:scale_settings, {}).permit(:root_note, :tempo, :loop,
                                             :pattern_name, :wave, :prefix, :partials_range).tap do |scale_settings_params|
                                               scale_settings_params.permit(:soft_delete, excluded: [])
                                             end
  end

  def remove_mode_number_from_params(mode_number)
    params[:excluded]&.reject! { |element| mode_number.to_s == element }
  end

  def add_mode_number_to_params(mode_number)
    params[:excluded] ||= []
    params[:excluded] << mode_number
  end
end
