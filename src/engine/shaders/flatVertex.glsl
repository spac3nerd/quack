attribute vec4 a_position;
attribute vec4 a_color;
uniform mat4 u_projMatrix;
uniform mat4 u_viewMatrix;
uniform mat3 u_modelMatrix;
varying vec4 v_color;

void main() {
	gl_Position = u_projMatrix * u_viewMatrix * u_modelMatrix * a_position;
	v_color = a_color;
}
