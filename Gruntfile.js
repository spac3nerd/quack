
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
					"src/engine/geometry/customGeometry.js",
					"src/engine/camera/orthographicCamera.js",
					"src/engine/camera/perspectiveCamera.js",
					"src/engine/renderers/GLRenderer.js",
					"resources/models/**.js"
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
			
		},
		//TODO: Think of a better way to handle this
		modelsToJS: {
			options: {
				lineSparator: "\n",
				parentObj: "quack.resources.models" 
			},
			dist: {
				source: "resources/models", //The root directory,
				dest: "resources/models/models.js"
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
	grunt.registerTask("importModels", ["modelsToJS"]);
	
	
	
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
	/*This task imports JSON object models into quack. It's not a very good way of handling this, but it's good enough for development. 
	 */
	
	grunt.registerTask("modelsToJS", function() {
		var done = this.async();
		var dist = grunt.config("modelsToJS").dist;
		var options = grunt.config("modelsToJS").options;
		var readline = require("linebyline");
		var r = [];
		var containerObj = {};
		var fs = require("fs");
		var walk = require("walk");
		var walker = walk.walk(dist.source);
		var k = 0;
		var finalVal = "";
		
		walker.on("file", function(rootDir, fileData) {
			var tokens = fileData.name.split(".");
			var type = tokens[tokens.length - 1];
			if (type === "json") {
				if (k === 0) {
					//fs.writeFile(dist.dest, options.parentObj + "= {");
					finalVal += options.parentObj + "= {";
				}
				//fs.writeFile(dist.dest, tokens[0] + ": ");
				finalVal += JSON.stringify(tokens[0]) + ": ";
				r.push(readline(rootDir + "/" + fileData.name));
				r[k].index = k;
				r[k].currentString = "";
				r[k].on("line", function(line) {
					
					setTimeout(function() {
						console.log(line);
						r[this.index].currentString += line;
						//r[this.index].resume();
					}.bind(this), 100);
					
					//r[this.index].currentString += line;
				});
				r[k].on("end", function() {
					finalVal += r[this.index].currentString;
					if (this.index === k - 1) {
						fs.writeFile(dist.dest, finalVal + "}");
					}
				});
				k++;
			}
			
		});
		//console.log("end");
		/*
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
		} */
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