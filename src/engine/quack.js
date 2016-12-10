var quack = {};
quack.prototype = {
	init: function() {
		//setup the needed namespaces
		quack.math = {};
		quack.core = {};
		quack.camera = {};
		quack.renderers = {};
		quack.material = {};
		quack.editor = {};
		quack.ui = {};
		quack.shaders = {};
		quack.resources = {
			models: {}
		};
	}(),
	version: "0.0.1"
};