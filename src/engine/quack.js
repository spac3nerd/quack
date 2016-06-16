var quack = {};
quack.prototype= {
	init: function() {
		//setup the needed namespaces
		quack.math = {};
		quack.core = {};
		quack.renderers = {};
		quack.editor = {};
		quack.ui = {};
	}(),
	version: "0.0.1"
};