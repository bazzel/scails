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

* [Render](https://render.com/)
* [Koyeb](https://www.koyeb.com/)
* [Fly.io](https://fly.io/)


## Credits

* List of musical scales from [Daqarta](https://www.daqarta.com/dw_ss0a.htm)
* Musical scale icons by erifqizeicon from [Noun Project](https://thenounproject.com/browse/icons/term/musical-scale/) (CC BY 3.0) (but slightly modified)
* Interactive music from [Tone.js](https://tonejs.github.io/)
* App icons from [Flowbite](https://flowbite.com/icons/)