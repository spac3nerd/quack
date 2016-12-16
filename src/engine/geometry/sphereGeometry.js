//This geometry is generated based on an icosahedron. Higher levels of refinement yield a smoother icosphere

quack.sphereGeometry = function(position, radius, refinement, material) {
	quack.geometry.call(this);
	this.type = "sphereGeom";
	this.radius = radius | 1;
	this.refinement = refinement | 0;
	this.material = material ? material : "flatMaterial";
	this.vertices = undefined;
	this.colors = undefined;
	this.indices = undefined;
	this.index = 0;
	this.midPointCache = {};
	
	if ( (position === undefined) || (!(position instanceof quack.math.vector3)) ) {
		this.position = new quack.math.vector3(0, 0, 0);
	}
	else {
		this.position = position;
		this.modelMatrix.setTranslate(this.position.x, this.position.y, this.position.z);
	}
	
	
	this.getNumVertices = function() {
		return this.vertices.length / 3;
	};
	
	/*callback - is called for every vertex and it passes the current vertex and its current color
	It expects to return an object containing modified data in the form:
	{
		color: [x, y, z]
	}
	*/
	this.setCustomColors = function(callback) {
		for (var k = 0, n = this.getNumVertices(); k < n; k++) {
			var data = {}, response;
			data.vertex = [this.vertices[(k * 3)], this.vertices[(k * 3) + 1], this.vertices[(k * 3) + 2]];
			data.color = [this.colors[(k * 3)], this.colors[(k * 3) + 1], this.colors[(k * 3) + 2]];
			response = callback(data);
			//apply the new color
			this.colors[(k * 3)] = response.color[0];
			this.colors[(k * 3) + 1] = response.color[1];
			this.colors[(k * 3) + 2] = response.color[2];
		}
	};
	
	//Populate the indices array from faces
	this._createIndices = function() {
		this.indices = new Uint16Array(this.faces.length * 3);
		for (var k = 0, n = this.faces.length * 3, l = 0; k < n; k+= 3, l++) {
			this.indices[k] = this.faces[l].v1;
			this.indices[k + 1] = this.faces[l].v2;
			this.indices[k + 2] = this.faces[l].v3;
		}
	};
	
	//TODO: Think about moving this to geometry
	//Calculate the normal vector for each face
	this._updateNormals = function() {
		
		this.normals = new Float32Array(this.faces.length * 3);
		
		for (var k = 0, n = this.faces.length; k < n; k++) {
			//get the three vertices that make up the face
			var p1 = new quack.math.vector3(this.vertices[(this.faces[k].v1 * 3)], this.vertices[(this.faces[k].v1 * 3) + 1], this.vertices[(this.faces[k].v1 * 3) + 2]);
			var p2 = new quack.math.vector3(this.vertices[(this.faces[k].v2 * 3)], this.vertices[(this.faces[k].v2 * 3) + 1], this.vertices[(this.faces[k].v2 * 3) + 2]);
			var p3 = new quack.math.vector3(this.vertices[(this.faces[k].v3 * 3)], this.vertices[(this.faces[k].v3 * 3) + 1], this.vertices[(this.faces[k].v3 * 3) + 2]);
			
			var A = new quack.math.vector3().subVectors(p2, p1);
			var B = new quack.math.vector3().subVectors(p3, p1);
			
			var normal = new quack.math.vector3().crossVectors(A, B).setNormal();
			//save the normal vector to the face object
			this.faces[k].setNormal(normal);
			//save the normal vector to something the renderer can use
			this.normals[(k * 3)] = normal.x;
			this.normals[(k * 3) + 1] = normal.y;
			this.normals[(k * 3) + 2] = normal.z;
		}
	};
	
	this._updateColors = function() {
		this.colors = new Float32Array(this.faces.length * 3);
		var color = this.solidColor;
		for (var k = 0, n = this.faces.length * 3, l = 0; k < n; k+= 3, l++) {
			this.colors[k] = color.x;
			this.colors[k + 1] = color.y;
			this.colors[k + 2] = color.z;
		}
	};
	
	this.setSolidColor = function(color) {
		this.solidColor = color;
		this._updateColors();
	};
	
	//This creates an unrefined icosahedron along the unit sphere - refinement will be applied after its creation
	this._createIcosahedron = function() {
		var a = Math.sqrt((5 - Math.sqrt(5)) / 10);
		var b = Math.sqrt((5 + Math.sqrt(5)) / 10);
		var color = this.solidColor;
		
		//will be type casted by the renderer
		this.vertices = new Array(
			-a, b, 0.0,
			a, b, 0.0,
			-a, -b, 0.0,
			a, -b, 0.0,
			
			0.0, -a, b,
			0.0, a, b,
			0.0, -a, -b,
			0.0, a, -b,
			
			b, 0.0, -a,
			b, 0.0, a,
			-b, 0.0, -a,
			-b, 0.0, a
		);
		this.index = (this.vertices.length / 3);
		
		this.colors = new Float32Array([
			color.x, color.y, color.z,
			color.x, color.y, color.z,
			color.x, color.y, color.z,
			color.x, color.y, color.z,
			
			color.x, color.y, color.z,
			color.x, color.y, color.z,
			color.x, color.y, color.z,
			color.x, color.y, color.z,
			
			color.x, color.y, color.z,
			color.x, color.y, color.z,
			color.x, color.y, color.z,
			color.x, color.y, color.z
		]);
		
		this.addFace(0, 5, 11);
		this.addFace(0, 1, 5);
		this.addFace(0, 7, 1);
		this.addFace(0, 10, 7);
		this.addFace(0, 11, 10);
		
		this.addFace(1, 9, 5);
		this.addFace(5, 4, 11);
		this.addFace(11, 2, 10);
		this.addFace(10, 6, 7);
		this.addFace(7, 8, 1);
		
		this.addFace(3, 4, 9);
		this.addFace(3, 2, 4);
		this.addFace(3, 6, 2);
		this.addFace(3, 8, 6);
		this.addFace(3, 9, 8);
		
		this.addFace(4, 5, 9);
		this.addFace(2, 11, 4);
		this.addFace(6, 10, 2);
		this.addFace(8, 7, 6);
		this.addFace(9, 1, 8);
		
		this._createIndices();
		
	};
	
	this._refineIcosphere = function() {
		var that = this, newVertices = [];
		
		//split midway along a side
		function split(v1, v2) {
			
			var v1Smaller = false;
			if (v1 < v2) {
				v1Smaller = true;
			}
			var smallerIndex = v1Smaller ? v1 : v2;
			var largerIndex = v1Smaller ? v2 : v1;
			var key = (smallerIndex << 16) + largerIndex;
			//console.log(smallerIndex + "\t" + largerIndex);
			if (that.midPointCache[key]) {
				return that.midPointCache[key];
			}
			
			v1 *= 3;
			v2 *= 3;
			//redefine v1, v2 to be the actual vertices
			v1 = new quack.math.vector3(that.vertices[v1], that.vertices[v1 + 1], that.vertices[v1 + 2]);
			v2 = new quack.math.vector3(that.vertices[v2], that.vertices[v2 + 1], that.vertices[v2 + 2]);
			
			var mid = new quack.math.vector3(
				(v1.x + v2.x) / 2,
				(v1.y + v2.y) / 2,
				(v1.z + v2.z) / 2
			);
			
			//normalize to keep everything on the unit sphere
			mid.setNormal();
			//console.log(mid.x + " " + mid.y + " " + mid.z);
			that.vertices.push(mid.x, mid.y, mid.z);
			that.midPointCache[key] = that.index;
			
			return that.index++;
		}
		
		
		
		
		var p1, p2, p3;
		//for every iteration
		for (var k = 0; k < this.refinement; k++) {
			//every refinement iteration splits a face into 4
			var newFaces = [];
			
			//for every face
			for (var n = 0, l = this.faces.length; n < l; n++) {
				//debugger;
				p1 = split(this.faces[n].v1, this.faces[n].v2);
				p2 = split(this.faces[n].v2, this.faces[n].v3);
				p3 = split(this.faces[n].v3, this.faces[n].v1);
				
				newFaces.push(new quack.core.face(this.faces[n].v1, p1, p3));
				newFaces.push(new quack.core.face(this.faces[n].v2, p2, p1));
				newFaces.push(new quack.core.face(this.faces[n].v3, p3, p2));
				newFaces.push(new quack.core.face(p1, p2, p3));
			}
			this.faces = newFaces;
			
		}
		
		this.update();
	};
	
	this.update = function() {
		this._createIndices();
		this._updateColors();
		this._updateNormals();
		
		this.vertices = new Float32Array(this.vertices);
		console.log("-----");
		console.log(this.getNumVertices());
		console.log(this.indices.length);
		console.log(this.faces.length);
	};
	
	this._init = function() {
		this._createIcosahedron();
		
		if (this.refinement > 0) {
			this._refineIcosphere();
		}
		else {
			this.update();
		}
		this._setMaterial(this.material, this);
	}.call(this);
};