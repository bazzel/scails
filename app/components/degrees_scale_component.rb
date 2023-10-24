# frozen_string_literal: true

class DegreesScaleComponent < ViewComponent::Base
  NOTE_IN_SCALE_CLASS = 'bg-gray-300'
  NOTE_NOT_IN_SCALE_CLASS = 'text-gray-300'

  def initialize(scale:)
    @scale = scale
  end

  def n1_class
    NOTE_IN_SCALE_CLASS
  end

  def n2_class
    note_class(1)
  end

  def n3_class
    note_class(2)
  end

  def n4_class
    note_class(3)
  end

  def n5_class
    note_class(4)
  end

  def n6_class
    note_class(5)
  end

  def n7_class
    note_class(6)
  end

  def n8_class
    note_class(7)
  end

  def n9_class
    note_class(8)
  end

  def n10_class
    note_class(9)
  end

  def n11_class
    note_class(10)
  end

  def n12_class
    note_class(11)
  end

  private
  def note_class(position)
    in_scale?(position) ? NOTE_IN_SCALE_CLASS : NOTE_NOT_IN_SCALE_CLASS
  end

  def in_scale?(position)
    @scale.binary_number[position] == '1'
  end
end
