# foodsharing light

A

## Build Setup

``` bash
# install quasar globally
$ npm install -g quasar-cli

# install dependencies
$ npm install

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

This is not currently open source. Please join [https://slackin.yunity.org](yunity slack) in *foodsharing-dev* channel to request access.

It is hosted at [gitlab.com/foodsharing-dev](https://gitlab.com/foodsharing-dev).

Once you have access follow the docker setup instructions there.

### foodsharing-api

Open source Symfony RESTful API available at [github.com/foodsharing-dev/foodsharing-api](https://github.com/foodsharing-dev/foodsharing-api).

Point it at the database inside the docker container:

```
# In app/config/parameters.yml
parameters:
    database_host: 127.0.0.1
    database_port: 13306
    database_name: foodsharing
    database_user: root
    database_password: root
```

## Testing

We use [chai](http://chaijs.com) for assertions, here is the [full list of available matchers](http://chaijs.com/api/bdd/).

You can run the tests with:

```
npm run test       # one off test run
npm run test:watch # run tests and re-run on change

# if you have xvfb run installed you can use it with
npm run test:xvfb
npm run test:watch:xvfb
```
