
quack.geometry = function() {
	
	this.type = "geom";
	this.vertices = undefined; //Let those that inherit from geometry decide what to use this for
	this.scale = new quack.math.vector3(1, 1, 1); //span of geometry in x/y/z directions
}; 
