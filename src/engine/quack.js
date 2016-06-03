var quack = {};
quack.prototype= {
	init: function() {
		//setup the needed namespaces
		quack.math = {};
		quack.core = {};
		quack.renderers = {};
	}(),
	version: "0.0.1"
};