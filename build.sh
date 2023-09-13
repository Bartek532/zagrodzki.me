#!/bin/bash

ARGS=$@

if [[ ${ARGS[*]} =~ 'redirect' ]]; then
  echo "Generating redirect to the newest post..."
  bun ./scripts/redirect
  echo "Done generating redirect..."
fi

if [[ ${ARGS[*]} =~ 'algolia' ]]; then
  echo "Updating Algolia index..."
  bun ./scripts/algolia
  echo "Done updating Algolia index..."
fi

if [[ ${ARGS[*]} =~ 'feed' ]]; then
  echo "Generating JSON and XML feed..."
  bun ./scripts/feed
  echo "Done generating feeds..."
fi

if [[ ${ARGS[*]} =~ 'next' ]]; then
  echo "Building Next.js..."
  bun next build
  echo "Done building Next.js..."
fi