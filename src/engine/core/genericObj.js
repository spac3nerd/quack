//The generic 3D object from which many world items will inherit
quack.core.genericObj = function(id) {
	//constructor
	this.id = id;
	this.type = "generic";
	this.parent = undefined;
	this.children = [];
	
	this.position = new quack.math.Vector3(0, 0, 0);
	this.scale = new quack.math.Vector3(1, 1, 1);
	
	this.setPosition = function(x, y ,z) {
		this.position.set(x, y ,z);
	};
	
	this.append = function(obj) {
		this.children.push(obj);
	};
};