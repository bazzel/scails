class Tone
  def self.waves
    { sine: 'Sine', square: 'Square', triangle: 'Triangle', sawtooth: 'Sawtooth' }
  end

  def self.prefixes
    { none: 'None', fm: 'FM', am: 'AM', fat: 'Fat' }
  end

  def self.partials_range
    (1..32)
  end
end
