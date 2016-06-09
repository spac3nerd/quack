
module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		
		jshint: {
			options:{
				laxcomma: true,
				smarttabs: true,
				debug: true,
				expr: true
			},
			all: [
				"src/**/*.js"
			]
		},
		//JSHint for minification
		minjshint: {
			options:{
				laxcomma: true,
				smarttabs: true
			},
			all: [
				"src/*.js"
			]
		},
		
		uglify: {
			compress: {
				hoist_funs: false,
				join_vars: false,
				loops: false,
				unused: false
			},
			beautify: {
				ascii_only: true
			},
			min: {
				files: {
					"dist/js/min/quack-min.js": ["dist/js/readable/quack.js"]
				}
			}
		},
		//Defaut concat job
		concat: {
			options: {
				separator: "\n;"
			},
			dist: {
				src: [
					"lib/**/*.js"
				],
				dest: "dist/js/readable/quack.js"
			}
		},
		//Experimental build concat
		
		concatExp: {
			options: {
				separator: "\n;"
			},
			dist: {
				src: [
					"src/engine/quack.js",
					"src/engine/math/Vector3.js",
					"src/engine/math/Vector4.js",
					"src/engine/math/Matrix3.js",
					"src/engine/math/Matrix4.js",
					"src/engine/core/genericObj.js",
					"src/engine/core/scene.js",
					"src/engine/camera/orthographicCamera.js",
					"src/engine/renderers/GLRenderer.js"
				],
				dest: "dist/js/readable/quack.js"
			}
		}, 
		concatcss: {
			options: {
				separator: "\n;"
			},
			dist: {
				src: [
					"css/*.css"
				],
				dest: "dist/css/readable/style.css"
			}
		},
		getFile: {
			dist: {
				resource: "https://cdnjs.cloudflare.com/ajax/libs/three.js/r77/three.js",
				dest: "lib",
				name: "three.js"
			}
		}
	});
	
	//Load taks from plugins
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jst");
	
	//Load the default task
	grunt.registerTask("default", ["debug"]);
	grunt.registerTask("get", ["getFile"]);
	grunt.registerTask("build", ["concat", "concatcss", "minjshint", "uglify"]); //"debugger" statements are not allowed
	grunt.registerTask("debug", ["concat", "concatcss", "jshint"]); //"debugger" statements are allowed in the development build
	
	grunt.registerTask("exp", ["concatExp", "concatcss", "jshint"]); // The experimental build
	
	//A simple custom file downloader
	grunt.registerTask("getFile", function() {
		
		var done = this.async();
		var dist = grunt.config("getFile").dist;
		var dir = dist.dest;
		
		var http = require("https");
		var fs = require("fs");
		var writeStream = fs.createWriteStream(dist.dest + "/" + dist.name); // dest/name
		var request = http.get(dist.resource, function(e) {
			e.pipe(writeStream);
			e.on("end", function(a) {
				console.log(dist.name + "-----" + " complete");
			});
		});
	});
	
	grunt.registerTask("concatExp", function() {
		var task = grunt.config("concatExp");
		var src = task.dist.src;
		var dist = task.dist;
		var options = task.options;
		grunt.config.set("concat", {
			options: options,
			dist: dist
		})
		grunt.task.run("concat");
	});
	
	//This task just changes the arguments for the concat task and then runs it.
	grunt.registerTask("concatcss", function() {
		var task = grunt.config("concatcss");
		var src = task.dist.src;
		var dist = task.dist;
		var options = task.options;
		
		grunt.config.set("concat", {
			options: options,
			dist: dist
		})
		grunt.task.run("concat");
	});
	
	grunt.registerTask("minjshint", function() {
		var task = grunt.config("minjshint");
		var all = task.all;
		var options = task.options;
		
		grunt.config.set("jshint", {
			options: options,
			all: all
		})
		grunt.task.run("jshint");
	});
	
};