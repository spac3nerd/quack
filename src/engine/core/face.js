//A triangle representing a face
//v1, v2, v3 - the index of vertices making up the face
quack.core.face = function(v1, v2, v3) { 
	this.v1 = v1;
	this.v2 = v2;
	this.v3 = v3;
};