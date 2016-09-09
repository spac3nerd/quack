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
	var triangles = [];
	var camera = new quack.camera.orthographicCamera(-5.0, 5.0, 5.0, -5.0, 20, 1);
	camera.setPosition(2, 2, 5);
	camera.setLookAt(0, 0, -4);
	camera.update();
	
	updateTextArea = function() {
		textArea.innerHTML = "Renderer Data:<br>";
		for (var k in renderer.rendererData) {
			textArea.innerHTML += k + ": " + renderer.rendererData[k] + "<br>";
		}
	};
	
	var temp;
	//3 rows wide
	for (var k = 0; k < 3; k++) {
		//5 cols deep
		for (var n = 0; n < 5; n++) {
			temp = new quack.triangleGeometry();
			
			temp.setPosition(3 * (k - 1), 0, -(2 * n));
			temp.setSolidColor(new quack.math.vector3((k + 1)/ 3, (n + 1) / 5, 0.0));
			console.log(temp.position);
			triangles.push(temp);
			scene.append(temp);
		}
	}
	
	renderer.render(scene, camera);
	updateTextArea();
} 
