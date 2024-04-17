# frozen_string_literal: true

class AddAliasesToScales < ActiveRecord::Migration[7.1]
  def change
    add_column :scales, :aliases, :string, array: true, default: []
    AllScalesImporter.run!
  end
end
