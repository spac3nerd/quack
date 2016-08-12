
quack.cubeGeometry = function(position) {
	quack.geometry.call(this);
	this.type = "scene";
	if ( (position === undefined) || (!(position instanceof quack.math.vector3)) ) {
		this.position = new quack.math.vector3(0, 0, 0);
	}
	else {
		this.position = position;
	}
	
	
	this.setVerticesFromCenter = function() {
		for (var k = 0; k < 8; k++) {
			
		}
		
	};
	
	
	this.update = function() {
		this.setVerticesFromCenter();
		
		return this;
	};
}; 
