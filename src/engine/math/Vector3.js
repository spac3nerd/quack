quack.math.vector3 = function(x, y ,z) {
	//constructor
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
	
	this.set = function(x, y ,z) {
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
		
		return this;
	};
	
	this.setX = function(x) {
		this.x = x;
		
		return this;
	};
	
	this.setY = function(y) {
		this.y = y;
		
		return this;
	};
	this.setZ = function(z) {
		this.z = z;
		
		return this;
	};
	
	//Add this vector with vector v
	this.addVector = function(v) {
		this.x = this.x + v.x;
		this.y = this.y + v.y;
		this.z = this.z + v.z;
		
		return this;
	};
	
	//Add scalar a to vector
	this.addScalar = function(a) {
		this.x = this.x + a;
		this.y = this.y + a;
		this.z = this.z + a;
		
		return this;
	};
	
	//multiply this vector with scalar a
	this.multScalar = function(a) {
		this.x = this.x * a;
		this.y = this.y * a;
		this.z = this.z * a;
		
		return this;
	};
	
	//Return the scalar product between this vector and vector v
	this.dotProduct = function(v) {
		return this.x * v.x + this.y * v.y + this.z * v.z;
	};
	
	//return the length of the vector
	this.length = function() {
		return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
	};
	
	this.normalize = function() {
		this.multScalar(1 / this.length());
	};
	
};
