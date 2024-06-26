# Scails

## Introduction

This is a simple Ruby on Rails application that shows all known musical scales.

## Prerequisites

- Install [all requirements](https://gorails.com/setup/macos/14-sonoma) on your machine
- PostgreSQL (instruction in the link above, but you can also use [asdf-postgres](https://github.com/smashedtoatoms/asdf-postgres) instead)

## Installation

```
$ git clone https://github.com/bazzel/scails.git
$ cd scails
$ asdf install # assuming you use asdf.
$ pg_ctl start # when you need to start your PostgreSQL server.
$ bundle install
```

If you use a different username than `postgres` to connect to your PostgreSQL server, update the `username` key in `config/database.yml`.

```
$ bin/rails db:setup
```

## Running / Development

- `$ bin/dev`
- Visit your app at [http://localhost:3000](http://localhost:3000).

### Populate the database

The project comes with a `seed.rb` which you can use to populate your development environment. This seed is automatically used when running `bin/rails db:setup`. To (re-)run it at a later moment:

`$ bin/rails db:seed`

## Hosting

The application has been deployed to the following environments (not all may be available at the time of writing):

- [Render](https://render.com/)
- [Koyeb](https://www.koyeb.com/) ([goto app](https://injured-ophelie-patrickbaselier.koyeb.app/))
- [Fly.io](https://fly.io/) ([goto app](https://scails-fragrant-forest-7349.fly.dev))

## Credits

- List of musical scales from [Daqarta](https://www.daqarta.com/dw_ss0a.htm)
- Musical scale icons by erifqizeicon from [Noun Project](https://thenounproject.com/browse/icons/term/musical-scale/) (CC BY 3.0) (but slightly modified)
- Interactive music from [Tone.js](https://tonejs.github.io/)
- App icons from
  - ~~[Flowbite](https://flowbite.com/icons/)~~
  - [Heroicons](https://heroicons.com/)
  - [VeryIcon](https://www.veryicon.com/icons/object/material_design_icons/) (and adjusted w/ [Inkscape](https://inkscape.org/))
  - [Material Design Icons](https://pictogrammers.com/library/mdi/category/audio/) (for oscillator types)
- Slider styling from https://toughengineer.github.io/demo/slider-styler/slider-styler.html
- Material Design 3 Color System from [Tailwind Material Colors](https://tailwind-material-colors-docs.vercel.app/)
- Color scheme from [Color Leap](https://colorleap.app/time/1950)

## Further reading

- [A very extensive reading about how to use Tone.js starting from playing a simple tone to playing blues and arpeggios](https://www.guitarland.com/MusicTheoryWithToneJS/TonejsSetup.html).
- [Piano scales – overviews and instructions](https://www.pianoscales.org/).
- [List of scales](https://www.musicca.com/dictionary/scales).
