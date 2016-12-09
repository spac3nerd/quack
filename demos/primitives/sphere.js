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
	var sphereG = new quack.sphereGeometry();
	var camera = new quack.camera.perspectiveCamera(canvas.clientWidth / canvas.clientHeight, 75, 20, 1);
	camera.setPosition(0, 0, 3);
	camera.setLookAt(0, 0, 0);
	camera.update();
	scene.append(sphereG);
	
	//set a custom color based on each vertex's y coordinate
	var setColors = function(data) {
		var response = {
			vertex: [],
			color: []
		};
		//red-green
		if (data.vertex[1] >= 0) {
			response.color = [data.vertex[1], 1 - data.vertex[1], 0];
		}
		//green-blue
		else {
			response.color = [0, 1 - (-data.vertex[1]), -data.vertex[1]];
		}
		
		return response;
	};
	sphereG.setCustomColors(setColors);
	
	//Things needed by rotation input
	var scaleX = document.getElementById("rotX");
	var scaleY = document.getElementById("rotY");
	var scaleZ = document.getElementById("rotZ");
	var rotButton = document.getElementById("apply");
	var valX = Number(scaleX.value) * Math.PI / 180, 
		valY = Number(scaleY.value) * Math.PI / 180, 
		valZ = Number(scaleZ.value) * Math.PI / 180;
	var date1 = new Date(), date2 = new Date();
	var delta;
	
	
	rotButton.onclick = function(e) {
		valX = Number(scaleX.value), valY = Number(scaleY.value), valZ = Number(scaleZ.value);
		//convert to radians since that's what matrix4 expects
		valX *= Math.PI / 180;
		valY *= Math.PI / 180;
		valZ *= Math.PI / 180;
	};
	
	//renderer.render(scene, camera);
	
	updateTextArea = function() {
		textArea.innerHTML = "Renderer Data:<br>";
		for (var k in renderer.rendererData) {
			textArea.innerHTML += k + ": " + renderer.rendererData[k] + "<br>";
		}
	};
	updateTextArea();
	
	function render() {
		date2 = new Date();
		delta = (date2 - date1) / 1000;
		date1 = date2;
		requestAnimationFrame(render);
		sphereG.setRotateX(valX * delta);
		sphereG.setRotateY(valY * delta);
		sphereG.setRotateZ(valZ * delta);
		renderer.render(scene, camera);
		updateTextArea();
	};
	
	render(); 
}