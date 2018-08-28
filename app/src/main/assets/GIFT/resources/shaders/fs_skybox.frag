#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
#else
    precision mediump float;
#endif

uniform samplerCube Sampler;
varying mediump vec3 TexCoord;

 void main() {
     gl_FragColor = textureCube(Sampler, TexCoord);
     gl_FragColor.a = 0.1;
 }
