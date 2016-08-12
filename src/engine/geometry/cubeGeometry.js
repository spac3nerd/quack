//TODO: I think that we can get away with only using 24 vertices per object by implementing indices. 
quack.cubeGeometry = function(position, width, height, depth) {
	quack.geometry.call(this);
	this.type = "cubeGeom";
	this.width = width || 1;
	this.height = height || 1;
	this.depth = depth || 1;
	
	if ( (position === undefined) || (!(position instanceof quack.math.vector3)) ) {
		this.position = new quack.math.vector3(0, 0, 0);
	}
	else {
		this.position = position;
	}
	
	//calcualte the number of vertices and set the vertices array
	//TODO: Eventually, cube geometry can take the number of triangles per side as an argument,
	//	at which point this function becomes more useful
	this._numberOfVertices = function() {
		var n = 12 * 3 * 3; //2 triangles per side, 3 vertices per triangle, each vertex has 3 elements
		return n;
	};
	
	//this._construct
	
	this.init = function() {
		this.vertices = new Float32Array(this._numberOfVertices());
		
	};
	
	this.init();
	
	
	this.update = function() {
		this.setVerticesFromCenter();
		
		return this;
	};
}; 
