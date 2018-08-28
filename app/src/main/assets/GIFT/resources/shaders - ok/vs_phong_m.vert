precision mediump float;

uniform mat4 projMatrix;
//uniform mat4 viewMatrix;
uniform mat4 modelViewMatrix;
uniform mat3 normalMVMatrix;
uniform mat3 normalMMatrix;

uniform float shininess;
//uniform float globalOpacity;

attribute vec3 position;
attribute vec3 normal;

varying vec3 modelNormal;

void main()
{
	vec4 mvPosition = modelViewMatrix * vec4(position,1.0);
	gl_Position = projMatrix * mvPosition;

	vec3 nml = normalize(normalMMatrix * normal);
	modelNormal = nml.xyz * 0.5 + 0.5;
}


