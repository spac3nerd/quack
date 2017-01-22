//The generic 3D object from which many world items will inherit
quack.core.genericObj = function(attr) {
	//constructor
	this.id = attr.id || "defaultID"; //can replace this with a random ID
	this.type = attr.type | "generic";
	this.parent = undefined;
	this.children = [];
	
	//this.position = new quack.math.vector3(0, 0, 0);
	//set position
	if (attr.position === undefined) {
		this.position = new quack.math.vector3(0, 0, 0);
	}
	else if (!(attr.position instanceof quack.math.vector3)){
		this.position = new quack.math.vector3(attr.position.x, attr.position.y, attr.position.z);
	}
	else {
		this.position = attr.position;
	}
	
	//set lookAt
	if (attr.lookAt === undefined) {
		this.lookAt = new quack.math.vector3(0, 0, 0);
	}
	else if (!(attr.lookAt instanceof quack.math.vector3)){
		this.lookAt = new quack.math.vector3(attr.lookAt.x, attr.lookAt.y, attr.lookAt.z);
	}
	else {
		this.lookAt = attr.lookAt;
	}
	
	this.up = new quack.math.vector3(0, 1, 0);
	//this.lookAt = new quack.math.vector3(0, 0, 0);
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
	
	this.setLookAt = function(x, y, z) {
		this.lookAt.set(x, y, z);
		
		return this;
	};
	
	this.append = function(obj) {
		this.children.push(obj);
		
		return this;
	};
};