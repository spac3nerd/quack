quack.math.Matrix3 = quack.math.Matrix3 || function() {
	//set the matrix to the 3x3 identity matrix
	this.setIdentity = function() {
		this.elements = [
			1, 0, 0,
			0, 1, 0,
			0, 0, 1
		];
		
		return this;
	};
	
	//constructor
	this.elements= new Float32Array(9);
	this.setIdentity();
	
	this.set = function(e00, e01, e02, e10, e11, e12, e20, e21, e22) {
		this.elements[0] = e00 || 1, this.elements[3] = e01 || 0, this.elements[6] = e02 || 0,
		this.elements[1] = e10 || 0, this.elements[4] = e11 || 1, this.elements[7] = e12 || 0,
		this.elements[2] = e20 || 0, this.elements[5] = e21 || 0, this.elements[8] = e22 || 1;
		
		return this;
	};
	
	this.multScalar = function(a) {
		for (var k = 0; k < 9; k++) {
			this.elements[k] *= a;
		}
		return this;
	};
	
	this.multVector = function(v) {
		var elem = this.elements;
		return new quack.math.Vector3(
			elem[0] * v.x + elem[3] * v.y + elem[6] * v.z, 
			elem[1] * v.x + elem[4] * v.y + elem[7] * v.z,
			elem[2] * v.x + elem[5] * v.y + elem[8] * v.z
		);
	};
	
};
