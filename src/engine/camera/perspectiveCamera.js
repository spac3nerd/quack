quack.camera.perspectiveCamera = function(aspect, fov, far, near) {
	quack.core.genericObj.call(this);
	
	this.aspect = aspect || 1;
	this.fov = fov || 45;
	this.far = far || 1;
	this.near = near || 0;
	
	this.lookAt = new quack.math.vector3(0, 0, 0);
	
	this.projectionMatrix = new quack.math.matrix4();
	this.viewMatrix = new quack.math.matrix4();
	
	this.updateProjectionMatrix = function() {
		var f = ((Math.PI / 180) * fov) / 2;
		var c = Math.cos(f) / Math.sin(f);
		this.projectionMatrix.set(
			c / aspect, 0, 0, 0,
			0, c, 0, 0,
			0, 0, (far + near) / (near - far), (2 * near * far) / (near - far),
			0, 0, -1, 0
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