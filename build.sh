#!/bin/bash

ARGS=$@

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
  pnpm build:next
  echo "Done building Next.js..."
fi