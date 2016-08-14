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
	var camera = new quack.camera.orthoCamera(-2.0, 2.0, 2.0, -2.0, 100, 0);
	camera.setPosition(5, 5, 5);
	camera.setLookAt(0, 0, 0);
	camera.update();
	scene.append(cubeG);

	renderer.render(scene, camera);

	var scaleX = document.getElementById("rotX");
	var scaleY = document.getElementById("rotY");
	var scaleZ = document.getElementById("rotZ");
	var button = document.getElementById("apply");
	var valX, valY, valZ;
	var date1 = new Date(), date2 = new Date();
	var delta;
	button.onclick = function(e) {
		valX = Number(scaleX.value), valY = Number(scaleY.value), valZ = Number(scaleZ.value);
		//convert to radians since that's what matrix4 expects
		valX *= Math.PI / 180;
		valY *= Math.PI / 180;
		valZ *= Math.PI / 180;
	};
	
	function render() {
		date2 = new Date();
		delta = (date2 - date1) / 1000;
		date1 = date2;
		requestAnimationFrame(render);
		cubeG.setRotateX(valX * delta);
		cubeG.setRotateY(valY * delta);
		cubeG.setRotateZ(valZ * delta);
		renderer.render(scene, camera);
	};
	
	render();
	
}