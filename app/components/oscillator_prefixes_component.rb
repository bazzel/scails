# frozen_string_literal: true

class OscillatorPrefixesComponent < ViewComponent::Base
  def initialize(form:, collection:)
    @form = form
    @collection = collection
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
    'items-center justify-center w-full h-full px-3 py-2 text-sm font-medium cursor-pointer text-on-surface focus:z-10'
  end

  def rounded_corners_class_names(key)
    {
      'rounded-s-full': first?(key), 'rounded-e-full': last?(key)
    }
  end

  def first?(key)
    key == @collection.keys.first
  end

  def last?(key)
    key == @collection.keys.last
  end
end
