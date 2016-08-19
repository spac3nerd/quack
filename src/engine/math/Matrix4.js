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
	
	//Row-major arguments. 
	this.set = function(e00, e01, e02, e03, e10, e11, e12, e13, e20, e21, e22, e23, e30, e31, e32, e33) {
		
		this.elements[0] = e00; this.elements[4] = e01; this.elements[8] = e02; this.elements[12] = e03;
		this.elements[1] = e10; this.elements[5] = e11; this.elements[9] = e12; this.elements[13] = e13;
		this.elements[2] = e20; this.elements[6] = e21; this.elements[10] = e22; this.elements[14] = e23;
		this.elements[3] = e30; this.elements[7] = e31; this.elements[11] = e32; this.elements[15] = e33;
		
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
	
	//Set this matrix to the result of nm
	this.multMatrices = function(n, m) {
		var a = n.elements, b = m.elements;
		
		//resulting matrix is calculated in row-major form
		var 
		//first row
		r00 = a[0] * b[0] + a[4] * b[1] + a[8] * b[2] + a[12] * b[3],
		r01 = a[0] * b[4] + a[4] * b[5] + a[8] * b[6] + a[12] * b[7],
		r02 = a[0] * b[8] + a[4] * b[9] + a[8] * b[10] + a[12] * b[11],
		r03 = a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12] * b[15],
		
		//second row
		r10 = a[1] * b[0] + a[5] * b[1] + a[9] * b[2] + a[13] * b[3],
		r11 = a[1] * b[4] + a[5] * b[5] + a[9] * b[6] + a[13] * b[7],
		r12 = a[1] * b[8] + a[5] * b[9] + a[9] * b[10] + a[13] * b[11],
		r13 = a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13] * b[15],
		
		//third row
		r20 = a[2] * b[0] + a[6] * b[1] + a[10] * b[2] + a[14] * b[3],
		r21 = a[2] * b[4] + a[6] * b[5] + a[10] * b[6] + a[14] * b[7],
		r22 = a[2] * b[8] + a[6] * b[9] + a[10] * b[10] + a[14] * b[11],
		r23 = a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14] * b[15],
		
		//fourth row
		r30 = a[3] * b[0] + a[7] * b[1] + a[11] * b[2] + a[15] * b[3],
		r31 = a[3] * b[4] + a[7] * b[5] + a[11] * b[6] + a[15] * b[7],
		r32 = a[3] * b[8] + a[7] * b[9] + a[11] * b[10] + a[15] * b[11],
		r33 = a[3] * b[12] + a[7] * b[13] + a[11] * b[14] + a[15] * b[15];
		
		this.set(r00, r01, r02, r03, r10, r11, r12, r13, r20, r21, r22, r23, r30, r31, r32, r33);
		
		return this;
	};
	
	
	this.setLookAt = function(pos, lookAt, up) {
		//debugger;
		
		var t = new quack.math.vector3().subVectors(pos, lookAt).setNormal();
		if (t.length() === 0) {
			t.set(0, 0, 1);
		}
		var upNorm = up.setNormal();
		var a = new quack.math.vector3().crossVectors(upNorm, t).setNormal();
		if (a.length() === 0) {
			t.z += 0.001;
			a = new quack.math.vector3().crossVectors(upNorm, t).setNormal();
		}
		var b = new quack.math.vector3().crossVectors(t, a);
		this.set(
			a.x, b.x, t.x, 0,
			a.y, b.y, t.y, 0,
			a.z, b.z, t.z, 0,
			0, 0, 0, 1
		);
		var T = new quack.math.matrix4().setTranslate(0, 0, -pos.z);
		this.multMatrices(this, T);

		/*
		var t = new quack.math.vector3().subVectors(lookAt, pos).setNormal();
		var upNorm = up.setNormal();
		var a = new quack.math.vector3().crossVectors(t, upNorm).setNormal();
		var b = new quack.math.vector3().crossVectors(a, t).setNormal();
		var M = new quack.math.matrix4().set(
			a.x, a.y, a.z, 0,
			b.x, b.y, b.z, 0,
			-t.x, -t.y, -t.z, 0,
			0, 0, 0, 1
		);
		var T = new quack.math.matrix4().setTranslate(-pos.x, -pos.y, -pos.z);
		this.multMatrices(M, T);
		*/
		return this;
	};
	
	//apply rotation to this matrix
	this.rotateX = function(angle) {
		this.multMatrices(this, quack.math.matrix4().setRotateX(angle));
		
		return this;
	};
	
	//apply rotation to this matrix
	this.rotateY = function(angle) {
		this.multMatrices(this, quack.math.matrix4().setRotateY(angle));
		
		return this;
	};
	
	//apply rotation to this matrix
	this.rotateZ = function(angle) {
		this.multMatrices(this, quack.math.matrix4().setRotateZ(angle));
		
		return this;
	};
	
	//set this matrix for rotation about the x axis
	this.setRotateX = function(angle) {
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
	this.setRotateY = function(angle) {
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
	this.setRotateZ = function(angle) {
		var a = Math.cos(angle), b = Math.sin(angle);
		
		this.set(
			a, -b, 0, 0,
			b, a, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		);
		
		return this;
	};
	
	//set this matrix to a translation transformation
	this.setTranslate = function(x, y, z) {
		this.set(
			1, 0, 0, x,
			0, 1, 0, y,
			0, 0, 1, z,
			0, 0, 0, 1
		);
		
		return this;
	};
	
	//apply scale to this matrix
	this.scale = function(x, y, z) {
		this.multMatrices(this, quack.math.matrix4().setScale(x, y, z));
		
		return this;
	};
	
	this.setScale = function(x, y, z) {
		this.set(
			x, 0, 0, 0,
			0, y, 0, 0,
			0, 0, z, 0,
			0, 0, 0, 1
		);
		
		return this;
	};
	
	return this;
};
