attribute vec4 a_position;
attribute vec4 a_normal;
uniform mat4 u_projMatrix;
uniform mat4 u_viewMatrix;
uniform mat4 u_modelMatrix;
uniform mat4 u_normalMatrix;
varying vec4 v_color;
varying vec3 v_normal;
varying vec3 v_position;
void main() {
	vec4 color = vec4(1.0, 1.0, 1.0, 1.0);
	gl_Position = u_projMatrix * u_viewMatrix * u_modelMatrix * a_position;
	v_position = vec3(u_ModelMatrix * a_Position);
	v_normal = normalize(vec3(u_normalMatrix * a_normal));
	v_color = color;
}