#extension GL_OES_EGL_image_external : require
precision mediump float;
#ifdef GL_IMG_texture_stream2
#extension GL_IMG_texture_stream2 : enable
#endif

uniform samplerExternalOES first_texture;
//uniform samplerStreamIMG first_texture;
uniform float fusePam[7];
uniform float lumAdjVal[2];
uniform float gamVal;
varying   vec2 g_vVSTexCoord1;
varying   vec2 g_vVSPosition;
						
void main()					
{	
	vec4 tmp_FragColor = texture2D(first_texture,g_vVSTexCoord1);
//	vec4 tmp_FragColor = textureStreamIMG(first_texture,g_vVSTexCoord1);
	
	vec2 dis;
	vec2 pos = vec2(g_vVSPosition.x, g_vVSPosition.y);	
	
//	if(abs(fusePam[6]) > 0.001)
	{
		float a = fusePam[6] + pos.x;
		float b = fusePam[6] - pos.x;
		
		float a1= step(0.0,a);
		float b1= step(0.0,b);
		float m1= min(a1, b1);
		
		dis.x = abs(m1*a + a1*(1.0-b1));
		dis.y = abs(m1*b + (1.0-a1)*(1.0-m1));
  }
  
  gl_FragColor.rgb = tmp_FragColor.rgb + lumAdjVal[0] + (lumAdjVal[1] - lumAdjVal[0])*dis.x/(dis.x + dis.y);
  gl_FragColor.rgb = pow(gl_FragColor.rgb, vec3(gamVal));
  gl_FragColor.a = 1.0;
}						
