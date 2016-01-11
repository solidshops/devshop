# SolidShops Development Environment

[![Travis](https://travis-ci.org/solidshops/devshop.svg)](https://travis-ci.org/solidshops/devshop)

![Logo](https://bitbucket-assetroot.s3.amazonaws.com/c/photos/2014/Feb/14/solidshops-logo-3651367901-1_avatar.png)



This project contains a SolidShops development environment which enables you to locally run your store with your production data.

This application syncs your local theme with our platform and spins up a webserver that proxies everything to our API/backend. This way you can use your favorite IDE or development tools like grunt/gulp/sass and especially livereload.

## Installation

### 1. Install application

```bash
mkdir {YOUR_SOLIDSHOPS_FOLDER} # /var/www/solidshops
cd {YOUR_SOLIDSHOPS_FOLDER}
git clone https://bitbucket.org/solidshops/theme_blum.git themes/theme_blum
git clone https://github.com/solidshops/devshop.git
cd devshop
npm install
```

### 2. Update config file
This repository contains a config.json.dist file in the “config/..” folder. You will need to copy this file to config/config.json and replace all config variables with your needs.

###### API keys
You’ll have to change the following to your own API KEY and API PASSWORD.
You’ll find these after logging on to the SolidShops platform: https://admin.solidshops.com/settings/integration

###### Theme folder

Don’t forget to select the correct theme folder in the config.json file.

If you are following this README you should update the config.json with the following folder variabel:

>"folder":"../themes/theme_blum"

### 3. Install server: NodeJS & NPM & Grunt
You don’t need any foreknowledge about Node.js to start this project. You’ll only need to follow a few logical steps.

###### On Your computer

If you want to run this application from your computer you need to have Node.js and grunt-cli installed on your computer.
Check the Node.js page for more info (https://nodejs.org/download/).

* npm install -g grunt-cli
* grunt serve
* -> http://127.0.0.1:3000/


###### Vagrant box
You probably already installed nodejs on your computer but if you are running an incompatible version(or you just don't want to install NodeJs on your computer) you can also use our vagrant box.

* change ip in config.json to 192.168.2.2
* vagrant up
* vagrant ssh
* cd /vagrant/devshop
* grunt serve
* -> http://192.168.2.2:3000/

###### Docker
Another way to run the devshop application is to use a Docker container.

* sudo docker-compose up
* -> http://127.0.0.1:3000/


## Deploy your theme

You can deploy your template with

>**grunt deploy**
