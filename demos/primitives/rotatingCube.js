function initDemo() {
	var canvas = document.getElementById("view");
	var renderer = new quack.renderers.GLRenderer(canvas, {
		width: canvas.clientWidth,
		height: canvas.clientHeight,
		clearColor: new quack.math.vector4(0.5, 0.0, 0.0, 1.0),
		antialias: true
	});
	var scene = new quack.core.scene("scene1");
	var cubeG = new quack.cubeGeometry(); //at (0,0,0)
	var camera = new quack.camera.orthographicCamera(-3.0, 3.0, 3.0, -3.0, 20, 3);
	camera.setPosition(5, 5, 5);
	camera.setLookAt(0, 0, 0);
	camera.update();
	scene.append(cubeG);
	debugger;
	renderer.render(scene, camera);

	var scaleX = document.getElementById("rotX");
	var scaleY = document.getElementById("rotY");
	var scaleZ = document.getElementById("rotZ");
	var button = document.getElementById("apply");
	var valX = Number(scaleX.value) * Math.PI / 180, 
		valY = Number(scaleY.value) * Math.PI / 180, 
		valZ = Number(scaleZ.value) * Math.PI / 180;
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