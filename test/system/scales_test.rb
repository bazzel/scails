# frozen_string_literal: true

require 'application_system_test_case'

class ScalesTest < ApplicationSystemTestCase
  setup do
    @scale = scales(:one)
  end

  test 'visiting the index' do
    visit scales_url
    assert_selector 'h1', text: 'Scales'
  end
end
