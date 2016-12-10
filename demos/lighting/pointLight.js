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
	
	var sphereG = new quack.sphereGeometry(new quack.math.vector3(0, 0, 0), 1, 2);
	sphereG.setSolidColor(new quack.math.vector3(0.74, 0.77, 0.81));
	//TODO: The shader thing really needs to be thought out!
	//This is a bad hack, but it's just to see if lighting works
	sphereG._renderData.shaders.vertex = quack.shaders.pointLightVVertex;
	
	//var camera = new quack.camera.perspectiveCamera(canvas.clientWidth / canvas.clientHeight, 75, 20, 1);
	var camera = new quack.camera.orthographicCamera(-2, 2, 2, -2, 20, 1);
	camera.setPosition(0, 0, 5);
	camera.setLookAt(0, 0, 0);
	camera.update();
	scene.append(sphereG);
	
	
	//renderer.render(scene, camera);
	
	updateTextArea = function() {
		textArea.innerHTML = "Renderer Data:<br>";
		for (var k in renderer.rendererData) {
			textArea.innerHTML += k + ": " + renderer.rendererData[k] + "<br>";
		}
	};
	updateTextArea();
	
	function render() {
		renderer.render(scene, camera);
		updateTextArea();
	};
	
	render(); 
}