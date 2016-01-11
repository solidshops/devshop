#!/usr/bin/env bash

# Update the box
# --------------
# Downloads the package lists from the repositories
# and "updates" them to get information on the newest
# versions of packages and their dependencies


# Install curl
# -----------
apt-get install -y curl

# Install Node js 5.3
# -------------------
curl -sL https://deb.nodesource.com/setup_0.12 | sudo -E bash -
apt-get update

#sudo apt-get install -y nodejs-legacy
apt-get install -y nodejs
apt-get install -y npm


# Upgrade NPM
# -----------
#sudo npm update -g npm

# Install Bower
# -------------
sudo npm install -g bower

# Install Grunt
# -------------
sudo npm install -g grunt-cli


