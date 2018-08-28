#extension GL_OES_EGL_image_external : require
precision mediump float;

uniform samplerExternalOES first_texture;
uniform float fusePam[7];
uniform float lumAdjVal[2];
uniform float gamVal;
varying   vec2 g_vVSTexCoord1;
varying   vec2 g_vVSPosition;			
						
void main()					
{	
	vec4 tmp_FragColor = texture2D(first_texture,g_vVSTexCoord1);
	
	vec2 dis;
	vec2 pos = vec2(g_vVSPosition.x, g_vVSPosition.y);		

	dis.x = abs(fusePam[0]*pos.x + fusePam[1] - pos.y)*(1.0/fusePam[2]);
	dis.y = abs(fusePam[3]*pos.x + fusePam[4] - pos.y)*(1.0/fusePam[5]);

  gl_FragColor.rgb = tmp_FragColor.rgb + lumAdjVal[0] + (lumAdjVal[1] - lumAdjVal[0])*dis.x/(dis.x + dis.y);
  gl_FragColor.rgb = pow(gl_FragColor.rgb, vec3(gamVal));
  gl_FragColor.a = 1.0;
}						
