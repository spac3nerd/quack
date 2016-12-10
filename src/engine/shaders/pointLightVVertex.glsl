attribute vec4 a_position;
attribute vec4 a_color;
attribute vec4 a_normal;
uniform mat4 u_projMatrix;
uniform mat4 u_viewMatrix;
uniform mat4 u_modelMatrix; 
uniform mat4 u_normalMatrix;
uniform vec3 u_lightColor;
uniform vec3 u_lightPosition; 
uniform vec3 u_ambientLight;
varying vec4 v_color;
void main() {
	gl_Position = u_projMatrix * u_viewMatrix * u_modelMatrix * a_position;
	vec3 normal = normalize(vec3(u_normalMatrix * a_normal));
	vec4 vertexPosition = u_modelMatrix * a_position;
	vec3 lightDirection = normalize(u_lightPosition - vec3(vertexPosition));
	float nDotL = max(dot(normal, lightDirection), 0.0);
	vec3 diffuse = u_lightColor * a_color.rgb * nDotL;
	vec3 ambient = u_ambientLight * a_color.rgb;
	v_color = vec4(diffuse + ambient, a_color.a);
}