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
	var cubes = [];
	var numOfCubes = 5;
	var angle = (360 / numOfCubes) * (Math.PI / 180);
	var hyp = 5; 
	//create the cubes and set their position
	for (var k = 0; k < numOfCubes; k++) {
		cubes[k] = new quack.cubeGeometry();
		cubes[k].setPosition(Math.random() * (0 - (-5)) + (-5), 
		Math.cos(angle * k) * hyp,
		Math.sin(angle * k) * hyp);
	}
	var rotAngles = [];
	//create a random set of rotation angles per second for each cube
	for (var k = 0; k < numOfCubes; k++) {
		rotAngles.push({
			x: Math.random() * (.78 - (-.78)) + (-.78),
			y: Math.random() * (.78 - (-.78)) + (-.78),
			z: Math.random() * (.78 - (-.78)) + (-.78)
		});
	}
	
	var camera = new quack.camera.perspectiveCamera(canvas.clientWidth / canvas.clientHeight, 75, 20, 1);
	camera.setPosition(10, 0, 0);
	camera.setLookAt(0, 0, 0);
	camera.update();
	for (k = 0; k < numOfCubes; k++) {
		scene.append(cubes[k]);
	}
	
	renderer.render(scene, camera);
	
	updateTextArea = function() {
		textArea.innerHTML = "Renderer Data:<br>";
		for (var k in renderer.rendererData) {
			textArea.innerHTML += k + ": " + renderer.rendererData[k] + "<br>";
		}
	};
	updateTextArea();

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
	};
	
	function render() {
		date2 = new Date();
		delta = (date2 - date1) / 1000;
		date1 = date2;
		requestAnimationFrame(render);
		for (var n = 0; n < numOfCubes; n++) {
			cubes[n].setRotateX(rotAngles[n].x * delta);
			cubes[n].setRotateY(rotAngles[n].y * delta);
			cubes[n].setRotateZ(rotAngles[n].z * delta);
		}
		renderer.render(scene, camera);
		updateTextArea();
	};
	
	render();
}