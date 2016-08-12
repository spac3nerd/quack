var quack = {};
quack.prototype= {
	init: function() {
		//setup the needed namespaces
		quack.math = {};
		quack.core = {};
		quack.renderers = {};
		quack.editor = {};
		quack.ui = {};
		quack.shaders = {};
	}(),
	version: "0.0.1"
};