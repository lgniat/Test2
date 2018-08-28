#extension GL_OES_EGL_image_external : require
precision mediump float;

#ifdef GL_IMG_texture_stream2
#extension GL_IMG_texture_stream2 : enable
#endif

//uniform sampler2D texture;
uniform samplerExternalOES texture;
//uniform samplerStreamIMG texture;
varying vec2 g_vVSTexCoord;	
uniform float gamVal;
						
void main()					
{	
	gl_FragColor = texture2D(texture,g_vVSTexCoord);
//	gl_FragColor = textureStreamIMG(texture,g_vVSTexCoord);	
	gl_FragColor.rgb = pow(gl_FragColor.rgb, vec3(gamVal));
}