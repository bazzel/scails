# frozen_string_literal: true

require 'test_helper'

class EnharmonicCalculatorTest < ActiveSupport::TestCase # rubocop:disable Style/Documentation
  test 'Chromatic (root C)' do
    expected = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    scale = scales(:chromatic)
    actual = EnharmonicCalculator.run!(scale:)

    assert_equal expected, actual
  end

  test 'Major (root C)' do
    expected = ['C', nil, 'D', nil, 'E', 'F', nil, 'G', nil, 'A', nil, 'B']
    scale = scales(:major)
    actual = EnharmonicCalculator.run!(scale:)

    assert_equal expected, actual
  end

  test 'Pentatonic Minor (root C)' do
    expected = ['C', nil, nil, 'Eb', nil, 'F', nil, 'G', nil, nil, 'Bb', nil]
    scale = scales(:pentatonic_minor)
    actual = EnharmonicCalculator.run!(scale:)

    assert_equal expected, actual
  end

  test 'Natural Minor (root C)' do
    expected = ['C', nil, 'D', 'Eb', nil, 'F', nil, 'G', 'Ab', nil, 'Bb', nil]
    scale = scales(:natural_minor)
    actual = EnharmonicCalculator.run!(scale:)

    assert_equal expected, actual
  end

  test 'Blues Minor (root C)' do
    # expected = ['C', nil, nil, 'D#', nil, 'E#', 'F#', 'G', nil, nil, 'A#', nil]
    expected = ['C', nil, nil, 'Eb', nil, 'F', 'Gb', 'Abb', nil, nil, 'Bb', nil]
    scale = scales(:blues_minor)
    actual = EnharmonicCalculator.run!(scale:)

    assert_equal expected, actual
  end

  test 'Phrygian (root C)' do
    expected = ['C', 'Db', nil, 'Eb', nil, 'F', nil, 'G', 'Ab', nil, 'Bb', nil]
    scale = scales(:phrygian)
    actual = EnharmonicCalculator.run!(scale:)

    assert_equal expected, actual
  end

  test 'Chromatic (root G)' do
    expected = ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#']
    scale = scales(:chromatic)
    actual = EnharmonicCalculator.run(scale:, root_note: 'G').result

    assert_equal expected, actual
  end

  test 'Major (root G)' do
    expected = ['G', nil, 'A', nil, 'B', 'C', nil, 'D', nil, 'E', nil, 'F#']
    scale = scales(:major)
    actual = EnharmonicCalculator.run(scale:, root_note: 'G').result

    assert_equal expected, actual
  end

  test 'Pentatonic Minor (root G)' do
    expected = ['G', nil, nil, 'Bb', nil, 'C', nil, 'D', nil, nil, 'F', nil]
    # expected = ['G', nil, 'A', 'Cbb', nil, 'Dbb', nil, 'D', 'Eb', nil, 'F', nil]
    scale = scales(:pentatonic_minor)
    actual = EnharmonicCalculator.run(scale:, root_note: 'G').result

    assert_equal expected, actual
  end

  test 'Natural Minor (root G)' do
    expected = ['G', nil, 'A', 'Bb', nil, 'C', nil, 'D', 'Eb', nil, 'F', nil]
    # expected = ['G', nil, 'A', 'Cbb', nil, 'Dbb', nil, 'D', 'Eb', nil, 'F', nil]
    scale = scales(:natural_minor)
    actual = EnharmonicCalculator.run(scale:, root_note: 'G').result

    assert_equal expected, actual
  end

  test 'Blues Minor (root G)' do
    # expected = ['G', nil, nil, 'A#', nil, 'B#', 'C#', 'D', nil, nil, 'F', nil]
    expected = ['G', nil, nil, 'Bb', nil, 'C', 'Db', 'Ebb', nil, nil, 'F', nil]
    scale = scales(:blues_minor)
    actual = EnharmonicCalculator.run(scale:, root_note: 'G').result

    assert_equal expected, actual
  end

  test 'Phrygian (root G)' do
    expected = ['G', 'Ab', nil, 'Bb', nil, 'C', nil, 'D', 'Eb', nil, 'F', nil]
    # expected = ['Fx', 'G#', nil, 'A#', nil, 'C', nil, 'D', 'Eb', nil, 'F', nil]
    scale = scales(:phrygian)
    actual = EnharmonicCalculator.run(scale:, root_note: 'G').result

    assert_equal expected, actual
  end
end
