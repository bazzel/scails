# frozen_string_literal: true

# This migration is needed since the free Render plan does not support SSH
class RunSeed < ActiveRecord::Migration[7.1]
  def change
    AllScalesImporter.run!
  end
end
