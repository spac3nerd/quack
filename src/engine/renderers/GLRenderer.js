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
	
	
	//init the context
	this.contextOptions = {
		alpha: options.alpha || false,
		antialias: options.antialias || false,
		stencil: options.stencil || false,
		depth: options.depth || false
	};
	
	
	//TODO: initialization of the gl context should be moved to its own module
	this.gl = canvas.getContext("webgl", this.contextOptions);
	this.gl.clearColor(this.clearColor.x, this.clearColor.y, this.clearColor.z, this.clearColor.w);
	this.gl.enable(this.gl.DEPTH_TEST);
	
	this.setClearColor = function(color) {
		gl.clearColor(color.x, color.y, color.z, color.w);
	};
}; 
