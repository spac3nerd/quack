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
	
	
	//init the context
	this.contextOptions = {
		alpha: options.alpha || false,
		antialias: options.antialias || false,
		stencil: options.stencil || false,
		depth: options.depth || false
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
	};
	
	this._setArrayBuffer = function(data, n, type, attr) {
		var buffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
		
		var a_attr = this.gl.getAttribLocation(this.gl.program, attr);
		if (a_attr < 0) {
			console.warn("failed to get location of: " + attr);
		}
		this.gl.vertexAttribPointer(a_attr, n, type, false, 0, 0);
		this.gl.enableVertexAttribArray(a_attr);
		//this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
	};
	
	this._attachShaders = function(data) {
		this._vertexShader = this._loadShader(this.gl.VERTEX_SHADER, data.shaders.vertex);
		this._fragShader = this._loadShader(this.gl.FRAGMENT_SHADER, data.shaders.frag);
		
		this.gl.attachShader(this._program, this._vertexShader);
		this.gl.attachShader(this._program, this._fragShader);
		this.gl.linkProgram(this._program);
		this.gl.useProgram(this._program);
		this.gl.program = this._program;
		
		this._prevRenderData = data;
	};
	
	this.render = function(scene, camera) {
		if ( !(scene instanceof quack.core.scene) || !(camera instanceof quack.camera.orthoCamera)) {
			throw new Error("Invalid render arguments");
		}
		
		//clear buffers
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
		this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
		var target;
		
		//This needs to account for all children at any depth, but this is fine for now
		for (var k = 0, n = scene.children.length; k < n; k++) {
			target = scene.children[k];
			
			//If no rendering data was set
			if (!this._prevRenderData) {
				this._attachShaders(target._renderData);
			}
			
			this._setArrayBuffer(target.vertices, 3, this.gl.FLOAT, "a_position");
			this._setArrayBuffer(target.colors, 3, this.gl.FLOAT, "a_color");
			this._setElementArrayBuffer(target.indices);
			
			//get location of matrices
			var u_projMatrix = this.gl.getUniformLocation(this.gl.program, 'u_projMatrix');
			var u_viewMatrix = this.gl.getUniformLocation(this.gl.program, 'u_viewMatrix');
			var u_modelMatrix = this.gl.getUniformLocation(this.gl.program, 'u_modelMatrix');
			
			//pass the matrices to the shader
			this.gl.uniformMatrix4fv(u_projMatrix, false, camera.projectionMatrix.elements);
			this.gl.uniformMatrix4fv(u_viewMatrix, false, camera.viewMatrix.elements);
			this.gl.uniformMatrix4fv(u_modelMatrix, false, target.modelMatrix.elements);
			
			//cross your fingers and hope it works
			this.gl.drawElements(this.gl.TRIANGLES, target.indices.length, this.gl.UNSIGNED_BYTE, 0);
		}

		
	};
	
	this._init = function() {
		this.gl = canvas.getContext("webgl", this.contextOptions);
		this.gl.clearColor(this.clearColor.x, this.clearColor.y, this.clearColor.z, this.clearColor.w);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
		this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
		this._program = this.gl.createProgram();
	}.call(this);
}; 
