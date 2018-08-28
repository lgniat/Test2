#extension GL_OES_EGL_image_external : require
precision mediump float;

uniform samplerExternalOES first_texture;
uniform float fusePam[14];
uniform float lumAdjVal[2];
uniform float posSig[2];
uniform float carAlpVal;
uniform float gamVal;
varying   vec2 g_vVSTexCoord1;
varying   vec2 g_vVSPosition;	
							
void main()					
{	
	vec4 tmp_FragColor = texture2D(first_texture,g_vVSTexCoord1);
	
	vec2 dis;
	//vec2 pos = vec2(g_vVSPosition.x, g_vVSPosition.y);
	vec2 pos = vec2(g_vVSPosition.x*posSig[0], g_vVSPosition.y*posSig[1]);
	dis.x = abs(fusePam[2]*pos.x + fusePam[3] - pos.y)*fusePam[0];
	dis.y = abs(fusePam[4]*pos.x + fusePam[5] - pos.y)*fusePam[1];	
			
  gl_FragColor.rgb = tmp_FragColor.rgb + lumAdjVal[0] + (lumAdjVal[1] - lumAdjVal[0])*dis.x/(dis.x + dis.y);
  gl_FragColor.rgb = pow(gl_FragColor.rgb, vec3(gamVal));
  gl_FragColor.a = 1.0;
}						
