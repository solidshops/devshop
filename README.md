# SolidShops Development environment v1.0.0
![Logo](https://bitbucket-assetroot.s3.amazonaws.com/c/photos/2014/Feb/14/solidshops-logo-3651367901-1_avatar.png)
 

This is a repository with a development environment which enables you to locally run your template from our platform.
You can easily use this environment to create your own template.

## Installation
Using this development environment requires you to have Node.js installed on your computer.
Check the Node.js page for more info (https://nodejs.org/download/).

You don’t need any foreknowledge about Node.js to start this project. You’ll only need to follow a few logical steps.

When you’ve installed Node.js, you can use the package manager to install the Grunt CLI package.

This package will only be used in the background and will help you with the creation of your template. You also don’t need any foreknowledge for this.

>**npm install -g grunt-cli**


Now you’ve installed Node.js and Grunt hebt geinstalleerd, you’ll have to navigate to your project folder where you’ve cloned your repository. Here you’ll have to execute some commands. This one will install the dependencies in the local node_modules folder. It’s not going to install anything on your system but only in your project folder.

>**npm install**

 

The system will create a config.json and config.json.dist file in the “config/..” folder by entering the following command.

You’ll have to change the following to your own API KEY and API PASSWORD. 
You’ll find these after logging on to the SolidShops platform: https://admin.solidshops.com/settings/integration


```
#!js

{

  "server":{

    "host":"127.0.0.1",

    "port":"3000"

  },

  "api":{

    "scheme":"https",

    "domain":"api.solidshops.com",

    "auth":{

      "basic":{

        "user":"YOURAPIKEY",

        "password":"YOURAPIPASSWORD"

      }

    }

  },

  "theme":{

    "folder":"../location/to/your/folder"

  },

  "cache":false

 

}

```

 

Don’t forget to select the correct theme folder in the config.json file.



```
#!js

"folder":"../location/to/your/folder"
```

 
 

When all of this has been filled out correctly, we will be able to start up our own local development environment via "grunt serve”. 

>**grunt serve** 

 

You can deploy your template via “grunt deploy”.
