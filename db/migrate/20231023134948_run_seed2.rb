# frozen_string_literal: true

class RunSeed2 < ActiveRecord::Migration[7.1]
  def change
    AllScalesImporter.run!
  end
end
