
quack.geometry = function() {
	
	this.type = "geom";
	this.vertices = undefined; //Let those that inherit from geometry decide what to use this for
	this.colors = undefined; //per vertex color definition.
	this.scale = new quack.math.vector3(1, 1, 1); //span of geometry in x/y/z directions
	this.modelMatrix = new quack.math.matrix4();
	
	this.isSolidColor = true; //by default, all vertices have the same color. Per vertex color may be specified later
	this.solidColor = new quack.math.vector3(1, 0, 0); //default solid color
	this._renderData = {
		shaders: {}
	};
	
	//color can be a vector3, or a simple object with x/y/z properties
	this.setSolidColor = function(color) {
		this.solidColor.x = color.x;
		this.solidColor.y = color.y;
		this.solidColor.z = color.z;
	};
	
	//colors - Float32Array
	this.setColors = function(colors) {
		this.colors = colors;
		this.isSolidColor = false;
	};
	
	//colors must be a float32array of the same length as vertices
	this.setPerVertexColor = function(colors) {
		if (colors instanceof Float32Array) {
			if (colors.length === this.vertices.length) {
				this.colors = colors;
			}
		}
	};
	
	
	this.setScale = function(x, y, z) {
		this.scale.set(x, y, z);
		this.modelMatrix.multMatrices(this.modelMatrix, new quack.math.matrix4().setScale(x, y, z));
	};
	
	this.setRotateX = function(angle) {
		this.modelMatrix.multMatrices(this.modelMatrix, new quack.math.matrix4().setRotateX(angle));
	};
	this.setRotateY = function(angle) {
		this.modelMatrix.multMatrices(this.modelMatrix, new quack.math.matrix4().setRotateY(angle));
	};
	this.setRotateZ = function(angle) {
		this.modelMatrix.multMatrices(this.modelMatrix, new quack.math.matrix4().setRotateZ(angle));
	};
}; 
