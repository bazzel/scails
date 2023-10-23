# frozen_string_literal: true

class CreateScales < ActiveRecord::Migration[7.1]
  def change
    create_table :scales do |t|
      t.integer :mode_number
      t.string :scale
      t.string :common_name

      t.timestamps
    end
  end
end
