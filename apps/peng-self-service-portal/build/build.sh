#!/usr/bin/env bash

docker build -f ./build/Dockerfile -t output-image . --platform linux/amd64 --no-cache
