# foodsharing light

A mobile-friendly frontend for foodsharing.de.
Focused on the tasks you need to do _now_!

[![Build Status](https://travis-ci.org/foodsharing-dev/foodsharing-light.svg?branch=master)](https://travis-ci.org/foodsharing-dev/foodsharing-light)
[![codecov](https://codecov.io/gh/foodsharing-dev/foodsharing-light/branch/master/graph/badge.svg)](https://codecov.io/gh/foodsharing-dev/foodsharing-light)
[![Greenkeeper badge](https://badges.greenkeeper.io/foodsharing-dev/foodsharing-light.svg)](https://greenkeeper.io/)

## Build Setup

``` bash
# install quasar globally
$ npm install -g quasar-cli

# install dependencies
$ npm install

# ... alternatively using yarn
$ yarn

# serve with hot reload at localhost:8080
$ quasar dev

# build for production with minification
$ quasar build

# lint code
$ quasar lint
```

## Backends

Two backends are required for this project.

In the future we may offer a public developer deployment of the two backends for if you are just doing frontend development.

### main foodsharing site

This is not currently open source. Please join [yunity slack](https://slackin.yunity.org) in *#foodsharing-dev* channel to request access.

It is hosted at [gitlab.com/foodsharing-dev](https://gitlab.com/foodsharing-dev).

Once you have access follow the docker setup instructions there.

### foodsharing-django-api

Open source Django RESTful API available at [github.com/foodsharing-dev/foodsharing-django-api](https://github.com/foodsharing-dev/foodsharing-django-api).

Point it at the database inside the docker container, see the example local settings for MySQL configuration.

#### API docs
If you want to develop the frontend, you can get an API documentation at [foodsharing light swagger documentation](https://beta.light.foodsharing.de/docs/).

## Testing

We use [chai](http://chaijs.com) for assertions, here is the [full list of available matchers](http://chaijs.com/api/bdd/).

You can run the tests with:

``` bash
# one off test run
$ npm run test

# run tests and re-run on change
$ npm run test:watch
```

Currently it will start Firefox as well as chrome to run the tests in, you can avoid it showing the UI by installing [xvfb](https://en.wikipedia.org/wiki/Xvfb) and ensuring `xvfb-run` is available on your path, then:

``` bash
# one off test run
$ npm run test:xvfb

# run tests and re-run on change
$ npm run test:watch:xvfb
```

When you use chromium and don't have chrome installed, you may need to set the `CHROME_BIN=chromium` environment variable (e.g. in your .bashrc)

## Deploying in production

Currently, deployment runs manually.
The run `scripts/deploy.sh` from root folder to deploy to live foodsharing site.

For sure, you need to have to have SSH keys setup to access production :-)
