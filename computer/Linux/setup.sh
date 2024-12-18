#!/bin/bash

docker rm -f computer_use_container || true

docker build -t computer_use_image src/modules/Linux