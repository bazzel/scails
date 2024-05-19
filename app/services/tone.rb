class Tone
  def self.waves
    I18n.t('tonejs.waves')
  end

  def self.prefixes
    I18n.t('tonejs.prefix')
  end

  def self.partials_range
    (1..32)
  end

  def self.pattern_names
    I18n.t('tonejs.pattern_names')
  end
end
