
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
					"src/engine/quack.js",
					"src/engine/math/Vector3.js",
					"src/engine/math/Vector4.js",
					"src/engine/math/Matrix3.js",
					"src/engine/math/Matrix4.js",
				],
				dest: "dist/js/readable/quack.js"
			}
		},
		//Experimental build concat
		/*
		concatExp: {
		}, */
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
	});
	
	//Load taks from plugins
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jst");
	
	//Load the default task
	grunt.registerTask("default", ["debug"]);
	
	grunt.registerTask("build", ["concat", "concatcss", "minjshint", "uglify"]); //"debugger" statements are not allowed
	grunt.registerTask("debug", ["concat", "concatcss", "jshint"]); //"debugger" statements are allowed in the development build
	
	//TODO
	/*
	grunt.registerTask("experimental", function() {

	});
	*/
	
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