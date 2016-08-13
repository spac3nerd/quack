//The generic 3D object from which many world items will inherit
quack.core.genericObj = function(id) {
	//constructor
	this.id = id;
	this.type = "generic";
	this.parent = undefined;
	this.children = [];
	
	this.position = new quack.math.vector3(0, 0, 0);
	this.up = new quack.math.vector3(0, 0, 1);
	this.scale = new quack.math.vector3(1, 1, 1);
	this.modelMatrix = new quack.math.matrix4();
	
	this.setPosition = function(x, y ,z) {
		this.position.set(x, y ,z);
		
		return this;
	};
	
	this.setUp = function(x, y, z) {
		this.up.set(x, y, z);
		
		return this;
	};
	
	this.append = function(obj) {
		this.children.push(obj);
		
		return this;
	};
};