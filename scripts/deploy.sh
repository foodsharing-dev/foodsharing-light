if quasar build
then
  echo "Build complete, deploying..."
  rsync -av --delete --safe-links dist/ fslight@foodsharing.de:/var/www/fslight/www/foodsharing-light/
  echo "Deploy complete!"
fi
