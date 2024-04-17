# frozen_string_literal: true

# This command can be used to to seed the scales table.
class AllScalesImporter < ActiveInteraction::Base
  def execute
    delete_all_scales
    each_line do |line|
      mode_number = line[0..6].strip

      if (scale = Scale.find_by(mode_number:))
        common_name = line[23..].strip
        aliases = scale.aliases + [common_name]
        scale.update!(aliases:)
      else
        create_scale(line)
      end
    end
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
    mode_number = line[0..6].strip
    scale = line[7..22].strip
    common_name = line[23..].strip

    Scale.create!(
      mode_number:,
      scale:,
      common_name:
    )
  end
end
