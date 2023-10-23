class AllScalesImporter < ActiveInteraction::Base
  def execute
    destroy_all_scales

    # read file
    file.each_line(chomp: true) do |line|
      mode_number = line[0, 7].strip
      scale = line[7, 16].strip
      common_name = line[16..].strip

      Scale.create!(
        mode_number:,
        scale:,
        common_name:
      )
    end

    # create models
  end

  private

  def destroy_all_scales
    Scale.destroy_all
  end

  def file
    Rails.root.join('db/seeds/all_scales.txt')
  end
end
