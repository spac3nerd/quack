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
	this.width = options.width || 0;
	this.height = options.height || 0;
	this.clearColor = options.clearColor || new quack.math.vector4(0.0, 0.0, 0.0, 0.0);
	this.gl = undefined;
	this._program = undefined;
	this._vertexShader = undefined;
	this._fragShader = undefined;
	
	
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
	
	this.render = function(scene, camera) {
		if ( !(scene instanceof quack.core.scene) || !(camera instanceof quack.camera.orthoCamera)) {
			throw new Error("Invalid render arguments");
		}
		
		//For now, have a single object that is to be rendered
		var target = scene.children[0];
		
		
		//clear buffers
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
		
		var iBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, iBuffer);
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, target.indices, this.gl.STATIC_DRAW);
		
		debugger;
		this._vertexShader = this._loadShader(this.gl.VERTEX_SHADER, target._renderData.shaders.vertex);
		this._fragShader = this._loadShader(this.gl.FRAGMENT_SHADER, target._renderData.shaders.frag);
		
		this.gl.attachShader(this._program, this._vertexShader);
		this.gl.attachShader(this._program, this._fragShader);
		this.gl.linkProgram(this._program);
		this.gl.useProgram(this._program);
		this.gl.program = this._program;
		
	};
	
	this._init = function() {
		this.gl = canvas.getContext("webgl", this.contextOptions);
		this.gl.clearColor(this.clearColor.x, this.clearColor.y, this.clearColor.z, this.clearColor.w);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
		this.gl.enable(this.gl.DEPTH_TEST);
		this._program = this.gl.createProgram();
	}.call(this);
}; 
