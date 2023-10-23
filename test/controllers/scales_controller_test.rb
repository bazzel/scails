# frozen_string_literal: true

require 'test_helper'

class ScalesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @scale = scales(:one)
  end

  test 'should get index' do
    get scales_url
    assert_response :success
  end
end
