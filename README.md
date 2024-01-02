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
$ rails db:setup
```

## Running / Development

- `$ dev`
- Visit your app at [http://localhost:3000](http://localhost:3000).

### Populate the database

The project comes with a `seed.rb` which you can use to populate your development environment. This seed is automatically used when running `rails db:setup`. To (re-)run it at a later moment:

`$ rails db:seed`
