#!/bin/bash

ARGS=$@

if [[ ${ARGS[*]} =~ 'redirect' ]]; then
  echo "Generating redirect to the newest post..."
  yarn new-post-redirect
  echo "Done generating redirect..."
fi

if [[ ${ARGS[*]} =~ 'algolia' ]]; then
  echo "Updating Algolia index..."
  yarn algolia
  echo "Done updating Algolia index..."
fi

if [[ ${ARGS[*]} =~ 'feed' ]]; then
  echo "Generating JSON and XML feed..."
  yarn feed
  echo "Done generating feeds..."
fi

if [[ ${ARGS[*]} =~ 'next' ]]; then
  echo "Building Next.js..."
  yarn next build
  echo "Done building Next.js..."
fi