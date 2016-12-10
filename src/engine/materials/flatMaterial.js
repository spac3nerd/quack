//geometry - reference to the geometry that owns this material
quack.material.flatMaterial = function(geometry) {
	this.geometry = geometry;
	
	//define the shaders used by this material
	this.shaders = {
		vertex: quack.shaders.flatVertex,
		frag: quack.shaders.flatFrag
	};
	//renderer will interpret this
	this.mappings = {
		arrayBuffer: {
			"a_position": ["geometry.vertices", 3, "FLOAT"],
			"a_color": ["geometry.colors", 3, "FLOAT"]
		},
		elementArrayBuffer: [
			"geometry.indices"
		],
		uniform: {
			"u_modelMatrix": "geometry.modelMatrix.elements",
			"u_projMatrix": "camera.projectionMatrix.elements",
			"u_viewMatrix": "camera.viewMatrix.elements"
		}
	};
	
}; 
