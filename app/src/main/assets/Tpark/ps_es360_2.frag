#extension GL_OES_EGL_image_external : require
precision mediump float;

uniform samplerExternalOES first_texture;
uniform samplerExternalOES second_texture;

uniform float fusePam[7];
uniform float lumAdjVal[2];
uniform float gamVal;
varying   vec2 g_vVSTexCoord1;
varying   vec2 g_vVSTexCoord2;
varying   vec2 g_vVSPosition;
						
void main()					
{	
	vec4 first_FragColor = texture2D(first_texture, g_vVSTexCoord1);
	vec4 second_FragColor = texture2D(second_texture, g_vVSTexCoord2);		
	vec2 dis;

	vec2 pos = vec2(g_vVSPosition.x, g_vVSPosition.y);

	dis.x = abs(fusePam[0]*pos.x + fusePam[1] - pos.y)/fusePam[2];
	float tmp1 = abs(fusePam[3]*pos.x + fusePam[4] - pos.y)/fusePam[5];
	float tmp2 = abs(pos.x - fusePam[6]);
	dis.y = min(tmp1, tmp2);

  gl_FragColor.rgb = ((first_FragColor.rgb + lumAdjVal[0]) * dis.x + (second_FragColor.rgb + lumAdjVal[1]) * dis.y) * (1.0/(dis.x + dis.y));
  gl_FragColor.rgb = pow(gl_FragColor.rgb, vec3(gamVal));
  gl_FragColor.a = 1.0;
}						
