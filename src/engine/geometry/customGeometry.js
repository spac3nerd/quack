quack.customGeometry = function(position, source) {
	quack.geometry.call(this);
	this.type = "customGeom";
// 	this.vertices = vertices;
// 	this.colors = colors;
// 	this.indices = indices;
// 	this.normals = normals;
	this.source = source;
	
	this._createColors = function() {
	};
	
	this._init = function() {
		//TODO: This should not be hardcoded once different material types are added
		this._renderData.shaders.vertex = quack.shaders.flatVertex;
		this._renderData.shaders.frag = quack.shaders.flatFrag;
	}.call(this);
};
 
