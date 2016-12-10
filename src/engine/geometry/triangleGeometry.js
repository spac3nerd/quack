quack.triangleGeometry = function(position, width, height, material) {
	quack.geometry.call(this);
	this.type = "triangleGeom";
	this.width = width || 1;
	this.height = height || 1;
	this.material = material ? material : "flatMaterial";
	
	
	
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
		
		this._setMaterial(this.material, this);
	}.call(this);
};
