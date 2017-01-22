quack.camera.orthographicCamera = function(left, right, top, bottom, far, near) {
	quack.core.genericObj.call(this, {});
	
	this.left = left;
	this.right = right;
	this.top = top;
	this.bottom = bottom;
	this.far = far;
	this.near = near;
	
	this.lookAt = new quack.math.vector3(0, 0, 0);
	
	this.projectionMatrix = new quack.math.matrix4();
	this.viewMatrix = new quack.math.matrix4();
	
	this.updateProjectionMatrix = function() {
		this.projectionMatrix.set(
			2 / (right - left), 0, 0, -((right + left) / (right - left)),
			0, 2 / (top - bottom), 0, -((top + bottom) / (top - bottom)),
			0, 0, ((-2) / (far - near)), -((far + near) / (far - near)),
			0, 0, 0 ,1
		);
	};
	
	this.update = function() {
		this.updateProjectionMatrix();
		this.viewMatrix.setLookAt(this.position, this.lookAt, this.up);
	};
	
	this._init = function() {
		this.updateProjectionMatrix();
		this.viewMatrix.setLookAt(this.position, this.lookAt, this.up);
	}.call(this);
	
};