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
} 
