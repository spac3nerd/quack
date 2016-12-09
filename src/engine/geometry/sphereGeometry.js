//This geometry is generated based on an icosahedron. Higher levels of refinement yield a smoother icosphere

quack.sphereGeometry = function(position, radius, refinement) {
	quack.geometry.call(this);
	this.type = "sphereGeom";
	this.radius = radius | 1;
	this.refinement = refinement | 0;
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
	
	this.getNumVertices = function() {
		return 12;
	};
	
	/*callback - is called for every vertex and it passes the current vertex and its current color
	It expects to return an object containing modified data in the form:
	{
		color: [x, y, z]
	}
	*/
	this.setCustomColors = function(callback) {
		for (var k = 0, n = this.getNumVertices(); k < n; k++) {
			var data = {}, response;
			data.vertex = [this.vertices[(k * 3)], this.vertices[(k * 3) + 1], this.vertices[(k * 3) + 2]];
			data.color = [this.colors[(k * 3)], this.colors[(k * 3) + 1], this.colors[(k * 3) + 2]];
			response = callback(data);
			//apply the new color
			this.colors[(k * 3)] = response.color[0];
			this.colors[(k * 3) + 1] = response.color[1];
			this.colors[(k * 3) + 2] = response.color[2];
		}
	};
	
	//This creates an unrefined icosahedron along the unit sphere - refinement will be applied after its creation
	this._createIcosahedron = function() {
		var a = Math.sqrt((5 - Math.sqrt(5)) / 10);
		var b = Math.sqrt((5 + Math.sqrt(5)) / 10);
		var color = this.solidColor;
		
		this.vertices = new Float32Array([
			-a, b, 0.0,
			a, b, 0.0,
			-a, -b, 0.0,
			a, -b, 0.0,
			
			0.0, -a, b,
			0.0, a, b,
			0.0, -a, -b,
			0.0, a, -b,
			
			b, 0.0, -a,
			b, 0.0, a,
			-b, 0.0, -a,
			-b, 0.0, a
		]);
		
		this.colors = new Float32Array([
			color.x, color.y, color.z,
			color.x, color.y, color.z,
			color.x, color.y, color.z,
			color.x, color.y, color.z,
			
			color.x, color.y, color.z,
			color.x, color.y, color.z,
			color.x, color.y, color.z,
			color.x, color.y, color.z,
			
			color.x, color.y, color.z,
			color.x, color.y, color.z,
			color.x, color.y, color.z,
			color.x, color.y, color.z
		]);
		
		this.indices = new Uint8Array([
			0, 11, 5,
			0, 5, 1,
			0, 1, 7,
			0, 7, 10,
			0, 10, 11,
			
			1, 5, 9,
			5, 11, 4,
			11, 10, 2,
			10, 7, 6,
			7, 1, 8,
			
			3, 9, 4,
			3, 4, 2,
			3, 2, 6,
			3, 6, 8,
			3, 8, 9,
			
			4, 9, 5,
			2, 4, 11,
			6, 2, 10,
			8, 6, 7,
			9, 8, 1
		]);
	};
	
	this._init = function() {
		this._createIcosahedron();
		//TODO: This should not be hardcoded once different material types are added
		this._renderData.shaders.vertex = quack.shaders.flatVertex;
		this._renderData.shaders.frag = quack.shaders.flatFrag;
	}.call(this);
};