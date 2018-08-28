#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
#else
    precision mediump float;
#endif

varying vec2 v_texCoord;
uniform sampler2D s_texture_y;
uniform sampler2D s_texture_uv;


void main() {
    vec4 yuv = vec4(1.0);
    vec4 rgb = vec4(1.0);

//16~235,16~240
mat4 conversion = mat4(1.0, 0.0, 1.596, -0.798,
                           1.0, -0.392, -0.813, 0.603,
                           1.0, 2.017, 0.0, -1.009,
                           0, 0, 0, 0);
//    Yâ€?= 0.257*R' + 0.504*G' + 0.098*B' + 16
//    Cb' = -0.148*R' - 0.291*G' + 0.439*B' + 128
//    Cr' = 0.439*R' - 0.368*G' - 0.071*B' + 128
//    R' = 1.164*(Yâ€?16) + 1.596*(Cr'-128)
//    G' = 1.164*(Yâ€?16) - 0.813*(Cr'-128) - 0.392*(Cb'-128)
//    B' = 1.164*(Yâ€?16) + 2.017*(Cb'-128)

    // Subtract constants to map the video range start at 0
    vec4 tmpColor;
    tmpColor  = texture2D(s_texture_y, v_texCoord);
    yuv.r = tmpColor.r;
    yuv.r = pow(yuv.r, 0.5);
    tmpColor = texture2D(s_texture_uv, v_texCoord);
    yuv.yz = tmpColor.ra;
    rgb = yuv*conversion;
    rgb.a = 1.0;
    gl_FragColor = rgb;
}

