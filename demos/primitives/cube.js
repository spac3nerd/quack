function initDemo() {
	var canvas = document.getElementById("view");
	var renderer = new quack.renderers.GLRenderer(canvas, {
		width: canvas.clientWidth,
		height: canvas.clientHeight,
		clearColor: new quack.math.vector4(0.0, 0.0, 0.0, 1.0),
		antialias: true
	});
	var scene = new quack.core.scene("scene1");
	var cubeG = new quack.cubeGeometry(); //at (0,0,0)
	var camera = new quack.camera.orthographicCamera(-2.0, 2.0, 2.0, -2.0, 100, 0);
	camera.setPosition(0, 0, 5);
	camera.setLookAt(0, 0, 0);
	camera.update();
	scene.append(cubeG);

	renderer.render(scene, camera);

	var scaleX = document.getElementById("scaleX");
	var scaleY = document.getElementById("scaleY");
	var scaleZ = document.getElementById("scaleZ");
	var button = document.getElementById("apply");
	button.onclick = function(e) {
		var valX = Number(scaleX.value) || 1, valY = Number(scaleY.value) || 1, valZ = Number(scaleZ.value) || 1;
		cubeG.setScale(valX, valY, valZ);
		renderer.render(scene, camera);
	};
}