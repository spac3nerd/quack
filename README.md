## Introduction
Welcome to quack, a javascript game engine. 

## Building the project

#### Linux and Mac

-Note that your distribution will likely provide node.js and git through its package manager.

You first need to install node.js on you machine. [(https://nodejs.org/)](https://nodejs.org/).

Followed by git [(http://git-scm.com/)](http://git-scm.com/).

Next, you need to install grunt:

	$ npm install -g grunt-cli
	
Afterwards, switch to the project root and simply run:

	$ npm install
	
This will install the needed plugins. 

At first run, and when GLSL files are modified, you need to run:
	
	$ grunt glsl

Finally, to build it all:

	$ grunt
	
This will run JSHint and then concatenate the Javascript and css sources to the dist/(js or css)/readable folders.

That's all! You now have the unminified sources in the dist folder!

#### Windows
First install the nodejs installer [(https://nodejs.org/)](https://nodejs.org/download/).

Followed by git [(http://git-scm.com/)](http://git-scm.com/).

Open up your command prompt.

Next, you need to install grunt:

	$ npm install -g grunt-cli

Change directory to project root, which is the root of the project.

Simply run:

	$ npm install

Then you might need to run:

	$ npm install grunt

At first run, and when GLSL files are modified, you need to run:
	
	$ grunt glsl

Finally, type:

	$ grunt
	
This will run JSHint and then concatenate the Javascript and css sources to the dist/(js or css)/readable folders.

That's all! You now have the unminified sources in the dist folder!



## Other grunt options
As previously stated, the default grunt task runs JSHint, and a concatenation of JS and CSS.
However, you may chose to run other tasks, or individual tasks.

	
#### Debug build
The debug build is the default choice when the user simply runs "grunt". The difference between production and debug besides
minification is that debug allows debugger statements in the code while production does not.

	$ grunt 
	
or

	$ grunt debug

#### Production build
The production build runs JSHint and minifies quack.js into quack-min.js which is then placed in dist/js/min.
It depends on /dist/js/readable/quack.js existing (created by debug build), and it does not allow debugger statements.

	$ grunt build
	
	
#### Adding shaders 
When you modify any shader file, you must run the following command followed by the debug build:

	$ grunt glsl

#### JSHint
If you simply wish to run JSHint on the source files:

	$ grunt jshint
	
#### Minification
You may chose to only run minification, but it does depend on the debug build

	$ grunt uglify
	
