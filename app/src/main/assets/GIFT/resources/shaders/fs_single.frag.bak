#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
#else
    precision mediump float;
#endif

varying vec2 v_texCoord;
uniform sampler2D s_texture;

void main() {
	gl_FragColor = texture2D( s_texture, v_texCoord );
}

