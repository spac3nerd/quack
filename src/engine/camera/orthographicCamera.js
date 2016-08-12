quack.camera.orthoCamera = function(left, right, top, bottom, far, near) {
	quack.core.genericObj.call(this);
	
	this.left = left;
	this.right = right;
	this.top = top;
	this.bottom = bottom;
	this.far = far;
	this.near = near;
	
	this.lookAt = new quack.math.vector3(1, 0, 0);
	
	//initialize the projection matrix
	this.projectionMatrix = new quack.math.matrix4();
	this.projectionMatrix.set(
		2 / (right - left), 0, 0, -((right + left) / (right - left)),
		0, 2 / (top - bottom), 0, -((top + bottom) / (top - bottom)),
		0, 0, -((2) / (far - near)), -((far + near) / (far - near)),
		0, 0, 0 ,1
	);
	
	//initialize the view matrix
	this.viewMatrix = new quack.math.matrix4();
	this.viewMatrix.setLookAt(this.position, this.lookAt, this.up);
	
};