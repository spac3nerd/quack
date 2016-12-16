/*
options {
	id: exactly what it sounds like
	width: 
	height:
}
*/
quack.renderers.GLRenderer = function(canvas, options) {
	//constructor
	this.canvas = canvas;
	this.id = options.id || "default";
	this.width = canvas.clientWidth;
	this.height = canvas.clientHeight;
	this.clearColor = options.clearColor || new quack.math.vector4(0.0, 0.0, 0.0, 0.0);
	this.gl = undefined;
	this._program = undefined;
	this._vertexShader = undefined;
	this._fragShader = undefined;
	this._prevRenderData = undefined;
	this.rendererData = {
		vertices: 0,
		faces: 0
	};
	
	
	//init the context
	this.contextOptions = {
		alpha: options.alpha || false,
		antialias: options.antialias || false,
		stencil: options.stencil || false,
		depth: options.depth || true,
		preserveDrawingBuffer: options.preserveDrawingBuffer || false
	};
	
	
	this.setClearColor = function(color) {
		this.gl.clearColor(color.x, color.y, color.z, color.w);
	};
	
	this._loadShader = function(type, src) {
		var shader = this.gl.createShader(type);
		this.gl.shaderSource(shader, src);
		this.gl.compileShader(shader);
		
		return shader;
	};
	
	this._setElementArrayBuffer = function(data) {
		var buffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, buffer);
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
		
		return buffer;
	};
	
	this._setArrayBuffer = function(data, n, type, attr) {
		var buffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
		
		var a_attr = this.gl.getAttribLocation(this.gl.program, attr);
		if (a_attr < 0) {
			console.warn("Failed to get location of: " + attr);
		}
		this.gl.vertexAttribPointer(a_attr, n, type, false, 0, 0);
		this.gl.enableVertexAttribArray(a_attr);
		
		return buffer;
	};
	
	this._attachShaders = function(data) {
		this._vertexShader = this._loadShader(this.gl.VERTEX_SHADER, data.vertex);
		this._fragShader = this._loadShader(this.gl.FRAGMENT_SHADER, data.frag);
		
		this.gl.attachShader(this._program, this._vertexShader);
		this.gl.attachShader(this._program, this._fragShader);
		this.gl.linkProgram(this._program);
		
		//check
		var linkStatus = this.gl.getProgramParameter(this._program, this.gl.LINK_STATUS);
		if (!linkStatus) {
			var e = this.gl.getProgramInfoLog(this._program);
			console.log("Error in linking!!!");
			console.log(e);
			
			return;
		}
		
		this.gl.useProgram(this._program);
		this.gl.program = this._program;
		
		this._prevRenderData = data;
	};
	
	this.render = function(scene, camera) {
		if ( !(scene instanceof quack.core.scene) || (!(camera instanceof quack.camera.orthographicCamera) && !(camera instanceof quack.camera.perspectiveCamera)) ) {
			throw new Error("Invalid render arguments");
		}
		
		//clear buffers
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		
		this.rendererData.vertices = 0;
		this.rendererData.faces = 0;
		var target, vertices, faces;
		
		//This needs to account for all children at any depth, but this is fine for now
		for (var k = 0, n = scene.children.length; k < n; k++) {
			target = scene.children[k];
			
			//If no rendering data was set
			if (!this._prevRenderData) {
				this._attachShaders(target.material.shaders);
			}
			
			this.rendererData.vertices += target.vertices.length / 3;
			this.rendererData.faces += target.faces.length;
			
			var arrayBuffers = [], elemArrayBuffers = [], uniforms = [], t, tokens, r, val;
			
			//Read the material mappings and apply them
			for (var q in target.material.mappings) {
				
				//used to get values when multiple levels are involved
				var getMultProps = function(obj, props) {
					for (var o = 1; o < props.length; o++) {
						obj = obj[props[o]];
					}
					return obj;
				};
				
				if (q === "arrayBuffer") {
					for (r in target.material.mappings[q]) {
						t = target.material.mappings[q][r];
						tokens = t[0].split(".");
						if (tokens[0] === "geometry") {
							val = getMultProps(target, tokens);
							arrayBuffers.push(this._setArrayBuffer(val, t[1], this.gl[t[2]], r));
						}
					}
				}
				else if (q === "elementArrayBuffer") {
					t = target.material.mappings[q];
					for (r = 0; r < t.length; r++) {
						tokens = t[r].split(".");
						if (tokens[0] === "geometry") {
							val = getMultProps(target, tokens);
							elemArrayBuffers.push(this._setElementArrayBuffer(val));
						}
					}
				}
				else if (q === "uniform") {
					for (r in target.material.mappings[q]) {
						t = target.material.mappings[q][r];
						
						//get the location of the uniform
						uniforms.push(this.gl.getUniformLocation(this.gl.program, r));
						
						
						//pass the correct data to the uniform
						tokens = t.split(".");
						if (tokens[0] === "geometry") {
							val = getMultProps(target, tokens);
							this.gl.uniformMatrix4fv(uniforms[uniforms.length - 1], false, val);
						}
						else if (tokens[0] === "camera") {
							val = getMultProps(camera, tokens);
							this.gl.uniformMatrix4fv(uniforms[uniforms.length - 1], false, val);
						}
					}
				}
			}
			
			//cross your fingers and hope it works
			this.gl.drawElements(this.gl.TRIANGLES, target.indices.length, this.gl.UNSIGNED_SHORT, 0);
		}
		
	};
	
	this._saveRendererData = function() {
		this.rendererData.depthBits = this.gl.getParameter(this.gl.DEPTH_BITS);
		for (var k in this.contextOptions) {
			this.rendererData[k] = this.contextOptions[k];
		}
	};
	
	this._init = function() {
		this.gl = canvas.getContext("webgl", this.contextOptions);
		this.gl.clearColor(this.clearColor.x, this.clearColor.y, this.clearColor.z, this.clearColor.w);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.depthFunc(this.gl.LEQUAL);
		this._saveRendererData();
		
		this._program = this.gl.createProgram();
	}.call(this);
}; 
