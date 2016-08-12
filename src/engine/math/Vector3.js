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
	this.add = function(a) {
		this.x = this.x + a.x;
		this.y = this.y + a.y;
		this.z = this.z + a.z;
		
		return this;
	};
	
	//add vectors a and b and set the result equal to this vector
	this.addVectors = function(a, b) {
		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;
		
		return this;
	};
	
	//sub vector a from this vector
	this.sub = function(a) {
		this.x = this.x - a.x;
		this.y = this.y - a.y;
		this.z = this.z - a.z;
		
		return this;
	};
	
	this.subVectors = function(a, b) {
		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;
		
		return this;
	};
	
	//Add scalar a to vector
	this.addScalar = function(a) {
		this.x = this.x + a;
		this.y = this.y + a;
		this.z = this.z + a;
		
		return this;
	};
	
	this.subScalar = function(a) {
		this.x = this.x - a;
		this.y = this.y - a;
		this.z = this.z - a;
		
		return this;
	};
	
	this.multiply = function(a) {
		this.x = this.x * a.x;
		this.y = this.y * a.y;
		this.z = this.z * a.z;
		
		return this;
	};
	
	this.multiplyVectors = function(a, b) {
		this.x = a.x * b.x;
		this.y = a.y * b.y;
		this.z = a.z * b.z;
		
		return this;
	};
	
	this.divide = function(a) {
		this.x = this.x / a.x;
		this.y = this.y / a.y;
		this.z = this.z / a.z;
		
		return this;
	};
	
	this.divideVectors = function(a, b) {
		this.x = a.x / b.x;
		this.y = a.x / b.y;
		this.z = a.z / b.x;
		
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
	
	//returns the normal vector
	this.normal = function() {
		//create new vector with same values as this one
		var t = new quack.math.vector3(this.x, this.y, this.z);
		t.setNormal();
		
		return t;
	};
	
	//sets this vector to its normal
	this.setNormal = function() {
		this.multScalar(1 / this.length());
		
		return this;
	};
	
};
