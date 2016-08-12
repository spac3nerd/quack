
quack.geometry = function() {
	
	this.type = "geom";
	this.vertices = undefined; //Let those that inherit from geometry decide what to use this for
	this.colors = undefined; //per vertex color definition.
	this.scale = new quack.math.vector3(1, 1, 1); //span of geometry in x/y/z directions
	
	this.isSolidColor = true; //by default, all vertices have the same color. Per vertex color may be specified later
	this.solidColor = new quack.vector3(1, 0, 0); //default solid color
	
	//color can be a vector3, or a simple object with x/y/z properties
	this.setSolidColor = function(color) {
		this.solidColor.x = color.x;
		this.solidColor.y = color.y;
		this.solidColor.z = color.z;
	};
	
	//colors must be a float32array of the same length as vertices
	this.setPerVertexColor = function(colors) {
		if (colors instanceof Float32Array) {
			if (colors.length === this.vertices.length) {
				this.colors = colors;
			}
		}
	};
}; 
