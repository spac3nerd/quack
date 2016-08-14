quack.triangleGeometry = function(position, width, height) {
	quack.geometry.call(this);
	this.type = "triangleGeom";
	this.width = width || 1;
	this.height = height || 1;
	
	this._createColors = function() {
		//If per-vertex colors are not specified, make each vertex the solidColor
		if (this.isSolidColor) {
			var c = this.solidColor;
			for (var k = 0; k < 3; k++) {
				this.colors = new Float32Array([
					c.x, c.y, c.z,
					c.x, c.y, c.z,
					c.x, c.y, c.z
				]);
			}
		}
	};
	
	this._createTriangle = function() {
		this.vertices = new Float32Array([
			0.0, 1.0, 0.0,
			-1.0, -1.0, 0.0,
			1.0,-1.0, 0.0
		]);
		this.indices = new Uint8Array([
			0, 1, 2
		]);
	};
	
	
	
	this._init = function() {
		this._createTriangle();
		this._createColors();
		//TODO: This should not be hardcoded once different material types are added
		this._renderData.shaders.vertex = quack.shaders.flatVertex;
		this._renderData.shaders.frag = quack.shaders.flatFrag;
	}.call(this);
};
