quack.math.matrix4 = function() {
	//set the matrix to the 4x4 identity matrix
	this.setIdentity = function() {
		this.elements = [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		];
		
		return this;
	};
	
	//constructor
	this.elements= new Float32Array(16);
	this.setIdentity();
	
	this.set = function(e00, e01, e02, e03, e10, e11, e12, e13, e20, e21, e22, e23, e30, e31, e32, e33) {
		this.elements[0] = e00 || 1, this.elements[4] = e01 || 0, this.elements[8] = e02 || 0, this.elements[12] = e03 || 0,
		this.elements[1] = e10 || 0, this.elements[5] = e11 || 1, this.elements[9] = e12 || 0, this.elements[13] = e13 || 0,
		this.elements[2] = e20 || 0, this.elements[6] = e21 || 0, this.elements[10] = e22 || 1, this.elements[14] = e23 || 0,
		this.elements[3] = e30 || 0, this.elements[7] = e31 || 0, this.elements[11] = e32 || 0, this.elements[15] = e33 || 0;
		
		return this;
	};
	
	//Don't feel like writing this one yet
	this.determinant = function() {
		
		
	};
	
	this.multScalar = function(a) {
		for (var k = 0; k < 16; k++) {
			this.elements[k] *= a;
		}
		return this;
	};
	
	//set this matrix for rotation about the x axis
	this.rotateX = function(angle) {
		var a = Math.cos(angle), b = Math.sin(angle);
		
		this.set(
			1, 0, 0, 0,
			0, a, -b, 0,
			0, b, a, 0,
			0, 0, 0, 1
		);
		
		return this;
	};
	
	//set this matrix for rotation about the y axis
	this.rotateY = function(angle) {
		var a = Math.cos(angle), b = Math.sin(angle);
		
		this.set(
			a, 0, b, 0,
			0, 1, 0, 0,
			-b, 0, a, 0,
			0, 0, 0, 1
		);
		
		return this;
	};
	
	//set this matrix for rotation about the z axis
	this.rotateZ = function(angle) {
		var a = Math.cos(angle), b = Math.sin(angle);
		
		this.set(
			a, -b, 0, 0,
			-b, a, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		);
		
		return this;
	};
	
	//set this matrix to a translation transformation
	this.translate = function(x, y, z) {
		this.set(
			1, 0, 0, x,
			0, 1, 0, y,
			0, 0, 1, z,
			0, 0, 0, 1
		);
		
		return this;
	};
};
