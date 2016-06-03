quack.math.Vector4 = quack.math.Vector4 || function(x, y ,z, w) {
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
	this.addVector = function(v) {
		this.x = this.x + v.x;
		this.y = this.y + v.y;
		this.z = this.z + v.z;
		this.w = this.w + v.w;
	};
	
	this.addScalar = function(a) {
		this.x = this.x + a;
		this.y = this.y + a;
		this.z = this.z + a;
		this.w = this.w + a;
	};
	
	//multiply this vector with scalar a
	this.multScalar = function(a) {
		this.x = this.x * a;
		this.y = this.y * a;
		this.z = this.z * a;
		this.w = this.w * a;
	};
	
	this.dotProduct = function(v) {
		return this.x * v.x + this.y * v.y + this.z * v.z;
	};
	
	this.length = function() {
		return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z) + (this.w * this.w));
	};
	
	this.normalize = function() {
		this.multScalar(1 / this.length());
	};
	
};