precision mediump float;

uniform vec4 diffuse;
uniform vec4 ambient;
uniform vec4 specular;
uniform vec4 emissive;
uniform float opacity;

varying float specularIntensity;
varying float diffuseIntensity;
varying float ambientIntensity;
//varying vec3 ReflectDir;
//uniform samplerCube Sampler;

uniform	sampler2D matcap;

//http://www.cmnsoft.com/article.php?id=109
// ambient = baseColor * ambientFactor
// diffuse = baseColor * diffuseFactor
// specular = baseColor * specularFactor
// baseColor = albedo
//metal:diffuseFactor = 0, specularFactor = 1;
//insulator:diffuseFactor = 1, specularFactor = 0.04~0.1;
//semiconductor = lerp(0.04, baseColor, metalness );

void main()
{
//	vec3 reflection = reflect(-lightDir, newNormal);
//	vec4 env = textureCube(Sampler, ReflectDir);

//	vec4 color = diffuse*ambientIntensity + diffuse * 0.3 * diffuseIntensity +  diffuse * 0.7 * specularIntensity;
	vec4 color = ambient*ambientIntensity + diffuse * diffuseIntensity + specular * specularIntensity;
	color.a = opacity;
	color += emissive;
	gl_FragColor = color;
}


