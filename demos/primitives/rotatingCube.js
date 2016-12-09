function initDemo() {
	var textArea = document.getElementById("textArea");
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
	renderer.render(scene, camera);
	
	updateTextArea = function() {
		textArea.innerHTML = "Renderer Data:<br>";
		for (var k in renderer.rendererData) {
			textArea.innerHTML += k + ": " + renderer.rendererData[k] + "<br>";
		}
	};
	updateTextArea();
	
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
	
	//Things needed by face color input
	var inputContainer = {}; //put all references to the text inputs into an object so we can easily reference back to them from a loop
	inputContainer.f1 = document.getElementById("f1");
	inputContainer.f2 = document.getElementById("f2");
	inputContainer.f3 = document.getElementById("f3");
	inputContainer.f4 = document.getElementById("f4");
	inputContainer.f5 = document.getElementById("f5");
	inputContainer.f6 = document.getElementById("f6");
	var colButton = document.getElementById("applyC");
	
	rotButton.onclick = function(e) {
		valX = Number(scaleX.value), valY = Number(scaleY.value), valZ = Number(scaleZ.value);
		//convert to radians since that's what matrix4 expects
		valX *= Math.PI / 180;
		valY *= Math.PI / 180;
		valZ *= Math.PI / 180;
	};
	
	colButton.onclick = function(e) {
		var input = "", colors = [];
		for (var k = 0, n = cubeG.getNumFaces(); k < n; k++) {
			input = inputContainer["f" + (k + 1)].value; //reference back to the container
			if (input.length > 0) {
				input = input.split(",");
				//too lazy to do any sort of input validation
				if (input.length === 3) {
					colors.push([input[0], input[1], input[2]]);
				}
				else {
					colors.push([]);
				}
			}
			else {
				colors.push([]);
			}
		}
		//apply the new colors
		cubeG.setPerFaceColors(colors);
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
		updateTextArea();
	};
	
	render();
	
}