#extension GL_OES_EGL_image_external : require
#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
#else
    precision mediump float;
#endif

varying vec2 v_texCoord;
uniform samplerExternalOES s_texture;

void main() {
	gl_FragColor = texture2D( s_texture, v_texCoord );
//	gl_FragColor.rgb = pow(gl_FragColor.rgb, vec3(0.9));
}
