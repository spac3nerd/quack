quack.material.flatMaterial = function() {
	//define the shaders used by this material
	this.shaders = {
		vertex: quack.shaders.flatVertex,
		frag: quack.shaders.flatFrag
	};
}; 
