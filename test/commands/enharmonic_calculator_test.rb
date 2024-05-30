# frozen_string_literal: true

require 'test_helper'

class EnharmonicCalculatorTest < ActiveSupport::TestCase # rubocop:disable Style/Documentation
  test 'Chromatic' do
    expected = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    scale = scales(:chromatic)
    actual = EnharmonicCalculator.run(scale:).result

    assert_equal expected, actual
  end

  test 'Major' do
    expected = ['C', nil, 'D', nil, 'E', 'F', nil, 'G', nil, 'A', nil, 'B']
    scale = scales(:major)
    actual = EnharmonicCalculator.run(scale:).result

    assert_equal expected, actual
  end

  test 'Natural Minor' do
    expected = ['C', nil, 'D', 'Eb', nil, 'F', nil, 'G', 'Ab', nil, 'Bb', nil]
    scale = scales(:natural_minor)
    actual = EnharmonicCalculator.run(scale:).result

    assert_equal expected, actual
  end

  test 'Blues Minor' do
    expected = ['C', nil, nil, 'D#', nil, 'E#', 'F#', 'G', nil, nil, 'A#', nil]
    scale = scales(:blues_minor)
    actual = EnharmonicCalculator.run(scale:).result

    assert_equal expected, actual
  end

  test 'Phrygian' do
    expected = ['C', 'Db', nil, 'Eb', nil, 'F', nil, 'G', 'Ab', nil, 'Bb', nil]
    scale = scales(:phrygian)
    actual = EnharmonicCalculator.run(scale:).result

    assert_equal expected, actual
  end
end
