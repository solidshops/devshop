#!/usr/bin/env bash

# Update the box
# --------------
# Downloads the package lists from the repositories
# and "updates" them to get information on the newest
# versions of packages and their dependencies
apt-get update

# Install curl
# -----------
apt-get install -y curl

# Install Node js 5.3
# -------------------
curl -sL https://deb.nodesource.com/setup_5.3 | sudo bash -
sudo apt-get install -y nodejs-legacy
sudo apt-get install -y npm

# Upgrade NPM
# -----------
npm update -g npm

# Install Bower
# -------------
npm install -g bower

# Install Grunt
# -------------
npm install -g grunt-cli


