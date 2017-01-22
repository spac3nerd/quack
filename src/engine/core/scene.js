//holds all objects to be rendered - all world objects are its children
quack.core.scene = function(id) {
	quack.core.genericObj.call(this, {
		id: id || undefined,
		type: "scene"
	});
};
