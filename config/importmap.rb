# frozen_string_literal: true

# Pin npm packages by running ./bin/importmap

pin 'application', preload: true
pin '@hotwired/turbo-rails', to: 'turbo.min.js', preload: true
pin '@hotwired/stimulus', to: 'stimulus.min.js', preload: true
pin '@hotwired/stimulus-loading', to: 'stimulus-loading.js', preload: true
pin_all_from 'app/javascript/controllers', under: 'controllers'
pin 'tone', to: 'https://ga.jspm.io/npm:tone@14.7.77/build/Tone.js'
pin 'stimulus-use' # @0.52.2
pin 'tailwind-material-colors' # @3.0.0
pin '/assets/utils', to: 'utils'
pin '/assets/variables', to: 'variables'
