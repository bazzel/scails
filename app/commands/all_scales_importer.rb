# frozen_string_literal: true

# This command can be used to to seed the scales table.
class AllScalesImporter < ActiveInteraction::Base
  def execute
    delete_all_scales
    each_line { |line| create_scale(line) }
  end

  private

  def delete_all_scales
    Scale.delete_all
  end

  def each_line(&)
    file.each_line(chomp: true, &)
  end

  def file
    Rails.root.join('db/seeds/all_scales.txt')
  end

  def create_scale(line)
    mode_number = line[0, 7].strip
    scale = line[7, 16].strip
    common_name = line[16..].strip

    Scale.create!(
      mode_number:,
      scale:,
      common_name:
    )
  end
end
