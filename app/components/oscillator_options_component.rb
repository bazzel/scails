# frozen_string_literal: true

class OscillatorOptionsComponent < ViewComponent::Base
  def initialize(form:, waves:)
    @form = form
    @waves = waves
  end

  def unselected_label_class_names(key)
    class_names(
      shared_label_class_names,
      'inline-flex hover:bg-on-secondary-container/[.08] focus:bg-on-secondary-container/[.12] active:bg-on-secondary-container/[.16] peer-checked:hidden',
      rounded_corners_class_names(key)
    )
  end

  private

  def selected_label_class_names(key)
    class_names(
      shared_label_class_names,
      'hidden peer-checked:interactive-bg-secondary-container peer-checked:inline-flex',
      rounded_corners_class_names(key)
    )
  end

  def shared_label_class_names
    'items-center justify-center w-full px-3 py-2 text-sm font-medium cursor-pointer text-on-surface focus:z-10'
  end

  def rounded_corners_class_names(key)
    {
      'rounded-s-full': first?(key), 'rounded-e-full': last?(key)
    }
  end

  def first?(key)
    key == @waves.keys.first
  end

  def last?(key)
    key == @waves.keys.last
  end
end
