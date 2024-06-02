# frozen_string_literal: true

class ScaleSettings
  include ActiveModel::Model
  include ActiveModel::Attributes

  attr_accessor :root_note, :tempo

  attribute :loop, default: false
  attribute :wave, default: -> { Tone.waves.keys.first }
  attribute :prefix, default: -> { Tone.prefixes.keys.first }
  attribute :partials_range, default: -> { Tone.partials_range.to_a[(Tone.partials_range.size / 2) - 1] }
  attribute :step, default: 5
  attribute :pattern_name, default: -> { Tone.pattern_names.keys.first }

  def range
    60..240
  end

  def tempo
    @tempo || (((range.max - range.min) / 2) + range.min)
  end

  def chromatic_scale
    @chromatic_scale ||= ChromaticScale.run!(root_note:)
  end
end
