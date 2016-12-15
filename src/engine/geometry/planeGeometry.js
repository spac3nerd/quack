quack.planeGeometry = function(position, material) {
	quack.geometry.call(this);
	this.type = "planeGeom";
	this.material = material ? material : "flatMaterial";
	this.vertices = undefined;
	this.colors = undefined;
	this.indices = undefined;
	this.index = 0;
	this.midPointCache = {};
	
	if ( (position === undefined) || (!(position instanceof quack.math.vector3)) ) {
		this.position = new quack.math.vector3(0, 0, 0);
	}
	else {
		this.position = position;
		this.modelMatrix.setTranslate(this.position.x, this.position.y, this.position.z);
	}
	
	//Might add number of segments as an argument
	this.getNumVertices = function() {
		return 4;
	};
	
	//Populate the indices array from faces
	this._createIndices = function() {
		this.indices = new Uint8Array(this.faces.length * 3);
		
		for (var k = 0, n = this.faces.length * 3, l = 0; k < n; k+= 3, l++) {
			this.indices[k] = this.faces[l].v1;
			this.indices[k + 1] = this.faces[l].v2;
			this.indices[k + 2] = this.faces[l].v3;
		}
	};
	
	this._createPlane = function() {
		var color = this.solidColor;
		
		this.vertices = new Float32Array([
			1, 1, 0,
			1, -1, 0,
			-1, -1, 0,
			-1, 1, 0,
		]);
		
		this.colors = new Float32Array([
			color.x, color.y, color.z,
			color.x, color.y, color.z,
			color.x, color.y, color.z,
			color.x, color.y, color.z
		]);
		
		this.addFace(0, 1, 2);
		this.addFace(2, 3, 0);
		
		this._createIndices();
		
	};
	
	this.update = function() {
	};
	
	this._init = function() {
		this._createPlane();
		this._setMaterial(this.material, this);
	}.call(this);
};