quack.math.vector4 = function(x, y ,z, w) {
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
	this.w = w || 0;
	
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
	
	this.setW = function(w) {
		this.w = w;
		
		return this;
	};
	
	//Add this vector with vector v
	this.add = function(a) {
		this.x = this.x + a.x;
		this.y = this.y + a.y;
		this.z = this.z + a.z;
		this.w = this.w + a.w;
		
		return this;
	};
	
	//add vectors a and b and set the result equal to this vector
	this.addVectors = function(a, b) {
		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;
		this.w = a.w + b.w;
		
		return this;
	};
	
	//sub vector a from this vector
	this.sub = function(a) {
		this.x = this.x - a.x;
		this.y = this.y - a.y;
		this.z = this.z - a.z;
		this.w = this.w - a.w;
		
		return this;
	};
	
	this.subVectors = function(a, b) {
		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;
		this.w = a.w - b.w;
		
		return this;
	};
	
	this.addScalar = function(a) {
		this.x = this.x + a;
		this.y = this.y + a;
		this.z = this.z + a;
		this.w = this.w + a;
		
		return this;
	};
	
	this.subScalar = function(a) {
		this.x = this.x - a;
		this.y = this.y - a;
		this.z = this.z - a;
		this.w = this.w - a;
		
		return this;
	};
	
	this.multiply = function(a) {
		this.x = this.x * a.x;
		this.y = this.y * a.y;
		this.z = this.z * a.z;
		this.w = this.w * a.w;
		
		return this;
	};
	
	this.multiplyVectors = function(a, b) {
		this.x = a.x * b.x;
		this.y = a.y * b.y;
		this.z = a.z * b.z;
		this.w = a.w * b.w;
		
		return this;
	};
	
	this.divide = function(a) {
		this.x = this.x / a.x;
		this.y = this.y / a.y;
		this.z = this.z / a.z;
		this.w = this.w / a.w;
		
		return this;
	};
	
	this.divideVectors = function(a, b) {
		this.x = a.x / b.x;
		this.y = a.x / b.y;
		this.z = a.z / b.x;
		this.w = a.z / b.w;
		
		return this;
	};
	
	//multiply this vector with scalar a
	this.multScalar = function(a) {
		this.x = this.x * a;
		this.y = this.y * a;
		this.z = this.z * a;
		this.w = this.w * a;
		
		return this;
	};
	
	this.dotProduct = function(v) {
		return this.x * v.x + this.y * v.y + this.z * v.z;
	};
	
	this.length = function() {
		return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z) + (this.w * this.w));
	};
	
	//returns the normal vector
	this.normal = function() {
		//create new vector with same values as this one
		var t = new quack.math.vector4(this.x, this.y, this.z, this.w);
		t.setNormal();
		
		return t;
	};
	
	//sets this vector to its normal
	this.setNormal = function() {
		this.multScalar(1 / this.length());
		
		return this;
	};
	
};