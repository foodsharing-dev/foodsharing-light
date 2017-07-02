#!/bin/bash

set -e

if quasar build; then

  # make current commit sha available publically
  git rev-parse HEAD > dist/COMMIT

  echo "Build complete, deploying..."
  rsync -av --delete --safe-links dist/ fslight@foodsharing.de:/var/www/fslight/www/foodsharing-light/
  echo "Deploy complete!"

fi
