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
	
	//calculate the number of vertices and set the vertices array
	//TODO: Eventually, cube geometry can take the number of triangles per side as an argument,
	//	at which point this function becomes more useful
	this.getNumVertices = function() {
		return 24;
	};
	
	this.getNumFaces = function() {
		return 6;
	};
	
	//colors - a 2D array of length <= 6
	//each element in colors represents a face, and leaving it empty will not change current color
	this.setPerFaceColors = function(colors) {
		for (var k = 0; k < Math.min(colors.length, 6); k++) {
			//only apply a color if it has been defined for the current face
			if (colors[k].length >= 1) {
				var c = k * 12; //the current face as mapped in the colors array
				//for all elements in the current face
				for (var n = 0; n < 12; n+= 3) {
					this.colors[c + n] = colors[k][0];
					this.colors[c + n + 1] = colors[k][1];
					this.colors[c + n + 2] = colors[k][2];
				}
				
				
			}
		}
		
		return this;
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
			0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0, //blue
			0.4, 1.0, 0.4,  0.4, 1.0, 0.4,  0.4, 1.0, 0.4,  0.4, 1.0, 0.4, //green
			1.0, 0.4, 0.4,  1.0, 0.4, 0.4,  1.0, 0.4, 0.4,  1.0, 0.4, 0.4, //orange/red
			1.0, 1.0, 0.4,  1.0, 1.0, 0.4,  1.0, 1.0, 0.4,  1.0, 1.0, 0.4, //yellow
			1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  1.0, 1.0, 1.0, //white
			0.4, 1.0, 1.0,  0.4, 1.0, 1.0,  0.4, 1.0, 1.0,  0.4, 1.0, 1.0 //teal
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
		this._createCube();
		//TODO: This should not be hardcoded once different material types are added
		this._renderData.shaders.vertex = quack.shaders.flatVertex;
		this._renderData.shaders.frag = quack.shaders.flatFrag;
	}.call(this);
}; 
