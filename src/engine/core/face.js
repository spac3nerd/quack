//A triangle representing a face
//v1, v2, v3 - the index of vertices making up the face
//normal - vector3 representing the face normal
quack.core.face = function(v1, v2, v3, normal) { 
	this.v1 = v1;
	this.v2 = v2;
	this.v3 = v3;
	this.normal = normal instanceof quack.math.vector3 ? normal : new quack.math.vector3(0, 0, 0);
	
	//set the normal vector, can either be a vector3 or an object with props x, y ,z
	this.setNormal = function(normal) {
		this.normal = normal instanceof quack.math.vector3 ? normal : new quack.math.vector3(normal.x, normal. y, normal.z);
		
		return this;
	};
};