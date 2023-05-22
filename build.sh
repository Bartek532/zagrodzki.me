#!/bin/bash

ARGS=$@

if [[ ${ARGS[*]} =~ 'redirect' ]]; then
  echo "Generating redirect to the newest post..."
  pnpm new-post-redirect
  echo "Done generating redirect..."
fi

if [[ ${ARGS[*]} =~ 'algolia' ]]; then
  echo "Updating Algolia index..."
  pnpm algolia
  echo "Done updating Algolia index..."
fi

if [[ ${ARGS[*]} =~ 'feed' ]]; then
  echo "Generating JSON and XML feed..."
  pnpm feed
  echo "Done generating feeds..."
fi

if [[ ${ARGS[*]} =~ 'next' ]]; then
  echo "Building Next.js..."
  pnpm next build
  echo "Done building Next.js..."
fi