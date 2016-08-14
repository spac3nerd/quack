
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
		//minification
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
		//Default concat job
		concat: {
			options: {
				separator: "\n;"
			},
			dist: {
				src: [
					"src/engine/quack.js",
					"src/engine/shaders/shaderCollection.js",
					"src/engine/math/Vector3.js",
					"src/engine/math/Vector4.js",
					"src/engine/math/Matrix3.js",
					"src/engine/math/Matrix4.js",
					"src/engine/core/genericObj.js",
					"src/engine/core/scene.js",
					"src/engine/geometry/geometry.js",
					"src/engine/geometry/cubeGeometry.js",
					"src/engine/geometry/triangleGeometry.js",
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
		glslToJS: {
			options: {
				lineSparator: "\n",
				parentObj: "quack.shaders" //a property for each file will be added
			},
			dist: {
				source: [
					"src/engine/shaders/flatVertex.glsl",
					"src/engine/shaders/flatFrag.glsl"
				],
				//these property names match up to the files listed above
				objNames: [
					"flatVertex",
					"flatFrag"
				],
				dest: "src/engine/shaders/shaderCollection.js"
			}
			
		}
		/*
		getFile: {
			dist: {
				resource: "",
				dest: "lib",
				name: ""
			}
		} */
	});
	
	//Load taks from plugins
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-concat");
	
	//Load the default task
	grunt.registerTask("default", ["debug"]);
	//grunt.registerTask("get", ["getFile"]);
	grunt.registerTask("build", ["concat", "concatcss", "minjshint", "uglify"]); //"debugger" statements are not allowed
	grunt.registerTask("debug", ["concat", "concatcss", "jshint"]); //"debugger" statements are allowed in the development build
	grunt.registerTask("glsl", ["glslToJS"]);
	
	
	
	//****************************
	//Custom task definitions
	//****************************
	
	/*A custom task to make GLSL usable
	This works by creating a JavaScript source file (specified by dist.dest) which contains
	a single object which has a property for each GLSL file (property names are given in dist.objNames and they directly map to 
	every source file in dist.source). The value of each property is the string representation of the respective GLSL source.
	*/
	grunt.registerTask("glslToJS", function() {
		var done = this.async();
		var dist = grunt.config("glslToJS").dist;
		var options = grunt.config("glslToJS").options;
		var readline = require("linebyline");
		var r = [];
		var containerObj = {};
		var fs = require("fs");
		
		//for each source file
		for (var k = 0; k < dist.source.length; k++) {
			r.push(readline(dist.source[k]));
			r[k].index = k; //add this prop so that the correct index can be retrieved on the end event
			r[k].currentString = "";
			r[k].on("line", function(line) {
				r[this.index].currentString += line + options.lineSparator;
				
			});
			r[k].on("end", function() {
				containerObj[dist.objNames[this.index]] = this.currentString;
				//when the final file is fully read
				if (this.index === k - 1) {
					//We must convert our object to JSON
					fs.writeFile(dist.dest, options.parentObj + "=" + JSON.stringify(containerObj) + ";");
				}
			});
		}
	});
	
	//A simple custom file downloader - currently not in use
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
	
	//Simply changes the arguments for the "concat" job
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
	
	//JSHint needs different options for the minified build
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