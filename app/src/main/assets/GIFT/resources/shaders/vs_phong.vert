precision mediump float;

uniform mat4 projMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelViewMatrix;
uniform mat3 normalMVMatrix;
uniform mat3 normalMMatrix;

uniform float shininess;
//uniform float globalOpacity;

attribute vec3 position;
attribute vec3 normal;

varying float specularIntensity;
varying float diffuseIntensity;
varying float ambientIntensity;

void main()
{
	vec4 mvPosition = modelViewMatrix * vec4(position,1.0);
	gl_Position = projMatrix * mvPosition;

	vec3 newNormal = normalize(normalMVMatrix * normal);
	//vec3 normalTarget = normal + position.xyz;
	//vec3 newNormal = normalize(vec3(modelViewMatrix * vec4(normalTarget,1.0) - mvPosition));
	
	//vec3 eyePos = vec3(0.0, -1.0, 0.0);//screen (0,0,0), up + ,right + ,outer +;
	//vec3 EyeDir = normalize(vec3(eyePos.xyz - mvPosition.xyz));//0.0,0.0,1.0,far away
	vec3 EyeDir = normalize( -mvPosition.xyz );//eyePos = 0.0,0.0,0.0

	//vec3 lightDir = normalize(normalMatrix * vec3(0.195, 0.976, 0.096));//parallel light
	//vec3 lightDir = vec3(0.195, 0.976, 0.096);//parallel light
	vec3 lightDir = vec3(0.0, 1.0, 0.5);//edit by lzc
	//vec3 lightDir2 = normalize(vec3(0.0, -2.0, 0.0) + EyeDir);
	vec3 lightDir2 = -lightDir;


//	color += ambient * nDotL2 * 0.5;
	float nDotL = max(dot(lightDir, newNormal), 0.0);

//blinn phong
	vec3 H = normalize(lightDir + EyeDir);
	float eDotR = max(dot(H, newNormal), 0.0);
	
//phong
//	vec3 reflection = reflect(-lightDir, newNormal);
//	float eDotR = max(dot(EyeDir, reflection), 0.0);

	float sIntensity = 0.0;

	if (eDotR > 0.0)
	{
		sIntensity = pow(eDotR,5.0);
	}
	
	float nDotL2 = max(dot(lightDir2, newNormal), 0.0);//second light for dark area
#if 1
	vec3 H2 = normalize(lightDir2 + EyeDir);
	//float eDotR2 = max(dot(H2, newNormal), 0.0);
	float eDotR2 = max(dot(H2, newNormal), 0.0);
		
	float sIntensity2 = 0.0;

	if (eDotR2 > 0.0)
	{
		sIntensity2 = pow(eDotR2,10.0);
	}
#endif
	//ambientIntensity = nDotL2 * 0.5;
	ambientIntensity = 0.3;
	//diffuseIntensity = nDotL;
	//specularIntensity = sIntensity;
	diffuseIntensity = nDotL + nDotL2 * 0.4;
	specularIntensity = sIntensity*0.8 +sIntensity2 * 0.4;
}


