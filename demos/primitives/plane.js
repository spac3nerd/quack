function initDemo() {
	var textArea = document.getElementById("textArea");
	var canvas = document.getElementById("view");
	var renderer = new quack.renderers.GLRenderer(canvas, {
		width: canvas.clientWidth,
		height: canvas.clientHeight,
		clearColor: new quack.math.vector4(0.0, 0.0, 0.0, 1.0),
		antialias: true
	});
	var scene = new quack.core.scene("scene1");
	var plane = new quack.planeGeometry(); //at (0,0,0)
	var camera = new quack.camera.orthographicCamera(-5.0, 5.0, 5.0, -5.0, 20, 1);
	camera.setPosition(0, 0, 5);
	camera.setLookAt(0, 0, 0);
	camera.update();
	scene.append(plane);
	plane.setColors(new Float32Array([
		0, 1, 0,
		1, 0, 0,
		0, 1, 0,
		0, 0, 1
	]));
	plane.setScale(2,2,2);
	
	renderer.render(scene, camera);
	
	updateTextArea = function() {
		textArea.innerHTML = "Renderer Data:<br>";
		for (var k in renderer.rendererData) {
			textArea.innerHTML += k + ": " + renderer.rendererData[k] + "<br>";
		}
	};
	updateTextArea();
	
}