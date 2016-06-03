/*
options {
	id: exactly what it sounds like
	width: 
	height:
}
*/
quack.core.genericObj = function(canvas, options) {
	//constructor
	this.canvas = canvas;
	this.id = options.id || "default";
	this.width = options.width || 0;
	this.height = options.height || 0;
	
	
	//init the context
	this.contextOptions = {
		alpha: options.alpha || false,
		antialias: options.antialias || false,
		stencil: options.stencil || false,
		depth: options.depth || false
	};
	
	this.gl = canvas.getContext("webgl", contextOptions);
	
}; 
