precision mediump float;

uniform vec4 diffuse;
uniform vec4 ambient;
uniform vec4 specular;
uniform vec4 emissive;
uniform float opacity;

varying vec3 modelNormal;
//varying vec3 ReflectDir;

uniform	sampler2D matcap;
uniform samplerCube cubemap;

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
	vec4 matCapColor = texture2D(matcap, modelNormal.xz);
//       gl_FragColor.rgb =  matCapColor.rgb;
	gl_FragColor.rgb = (ambient.rgb * 0.9 + specular.rgb ) * matCapColor.rgb + 0.1 * ambient.rgb + emissive.rgb;
	gl_FragColor.a = opacity;
//gl_FragColor.a = 1.0;
}


