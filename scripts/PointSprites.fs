precision mediump float;

uniform sampler2D uSampler;

void main(void) {
	gl_FragColor = texture2D(uSampler, gl_PointCoord);
	gl_FragColor.a = 0.4;
}
