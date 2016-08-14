quack.cubeGeometry = function(position, width, height, depth) {
	quack.geometry.call(this);
	this.type = "cubeGeom";
	this.width = width || 1; //x-direction
	this.height = height || 1; //y-direction
	this.depth = depth || 1; //z-direction
	this.vertices = undefined;
	this.colors = undefined;
	this.indices = undefined;
	
	if ( (position === undefined) || (!(position instanceof quack.math.vector3)) ) {
		this.position = new quack.math.vector3(0, 0, 0);
	}
	else {
		this.position = position;
		this.modelMatrix.setTranslate(this.position.x, this.position.y, this.position.z);
	}
	
	//calcualte the number of vertices and set the vertices array
	//TODO: Eventually, cube geometry can take the number of triangles per side as an argument,
	//	at which point this function becomes more useful
	this._numberOfVertices = function() {
		var n = 12 * 3 * 3; //2 triangles per side, 3 vertices per triangle, each vertex has 3 elements
		return n;
	};
	
	this._createCube = function() {
		this.vertices = new Float32Array([
			1.0, 1.0, 1.0,  -1.0, 1.0, 1.0,  -1.0,-1.0, 1.0,   1.0,-1.0, 1.0,
			1.0, 1.0, 1.0,   1.0,-1.0, 1.0,   1.0,-1.0,-1.0,   1.0, 1.0,-1.0,
			1.0, 1.0, 1.0,   1.0, 1.0,-1.0,  -1.0, 1.0,-1.0,  -1.0, 1.0, 1.0,
			-1.0, 1.0, 1.0,  -1.0, 1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0,-1.0, 1.0,
			-1.0,-1.0,-1.0,   1.0,-1.0,-1.0,   1.0,-1.0, 1.0,  -1.0,-1.0, 1.0,
			1.0,-1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0, 1.0,-1.0,   1.0, 1.0,-1.0
		]);
		this.colors = new Float32Array([
			0.4, 0.4, 1.0,  0.4, 0.4, 1.0,  0.4, 0.4, 1.0,  0.4, 0.4, 1.0,
			0.4, 1.0, 0.4,  0.4, 1.0, 0.4,  0.4, 1.0, 0.4,  0.4, 1.0, 0.4,
			1.0, 0.4, 0.4,  1.0, 0.4, 0.4,  1.0, 0.4, 0.4,  1.0, 0.4, 0.4,
			1.0, 1.0, 0.4,  1.0, 1.0, 0.4,  1.0, 1.0, 0.4,  1.0, 1.0, 0.4,
			1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  1.0, 1.0, 1.0,
			0.4, 1.0, 1.0,  0.4, 1.0, 1.0,  0.4, 1.0, 1.0,  0.4, 1.0, 1.0
		]);
		this.indices = new Uint8Array([
			0, 1, 2,   0, 2, 3,
			4, 5, 6,   4, 6, 7,
			8, 9,10,   8,10,11,
			12,13,14,  12,14,15,
			16,17,18,  16,18,19,
			20,21,22,  20,22,23
		]);
	};
	
	
	this.update = function() {
		return this;
	};
	this._init = function() {
		this.vertices = new Float32Array(this._numberOfVertices());
		this._createCube();
		this._renderData.shaders.vertex = quack.shaders.flatVertex;
		this._renderData.shaders.frag = quack.shaders.flatFrag;
	}.call(this);
}; 
