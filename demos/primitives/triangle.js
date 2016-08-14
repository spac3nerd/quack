function initDemo() {
	var canvas = document.getElementById("view");
	var renderer = new quack.renderers.GLRenderer(canvas, {
		width: canvas.clientWidth,
		height: canvas.clientHeight,
		clearColor: new quack.math.vector4(0.0, 0.0, 0.0, 1.0),
		antialias: true
	});
	var scene = new quack.core.scene("scene1");
	var triangle = new quack.triangleGeometry(); //at (0,0,0)
	var camera = new quack.camera.orthoCamera(-1.0, 1.0, 1.0, -1.0, 100, 0);
	camera.setPosition(0, 0, 5);
	camera.setLookAt(0, 0, 0);
	camera.update();
	scene.append(triangle);

	renderer.render(scene, camera);
	
	var v1r = document.getElementById("v1r");
	var v1g = document.getElementById("v1g");
	var v1b = document.getElementById("v1b");
	
	var v2r = document.getElementById("v2r");
	var v2g = document.getElementById("v2g");
	var v2b = document.getElementById("v2b");
	
	var v3r = document.getElementById("v3r");
	var v3g = document.getElementById("v3g");
	var v3b = document.getElementById("v3b");
	var button = document.getElementById("apply");
	
	//initial color
	var ic = triangle.solidColor;
	//populate the text fields with the initial color values
	v1r.value = ic.x;
	v1g.value = ic.y;
	v1b.value = ic.z;
	
	v2r.value = ic.x;
	v2g.value = ic.y;
	v2b.value = ic.z;
	
	v3r.value = ic.x;
	v3g.value = ic.y;
	v3b.value = ic.z;
	
	
	button.onclick = function(e) {
		var val1r = Number(v1r.value), val1g = Number(v1g.value), val1b = Number(v1b.value),
			val2r = Number(v2r.value), val2g = Number(v2g.value), val2b = Number(v2b.value),
			val3r = Number(v3r.value), val3g = Number(v3g.value), val3b = Number(v3b.value);
		
		triangle.setColors(new Float32Array([
			val1r, val1g, val1b,
			val2r, val2g, val2b,
			val3r, val3g, val3b
		]));
		renderer.render(scene, camera);
	};
} 
