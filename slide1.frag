precision mediump float;
uniform float time;
uniform vec2 resolution;
uniform sampler2D midi;
uniform sampler2D backbuffer;
uniform sampler2D image01;
uniform sampler2D image02;
uniform sampler2D image03;
uniform sampler2D image04;
uniform sampler2D image05;
uniform sampler2D image06;
uniform sampler2D image07;
uniform sampler2D image08;
uniform sampler2D image09;
uniform sampler2D image10;

float nano(in float ch) {
  return texture2D(midi, vec2((224. + ch) / 256., .0)).x * 2.; // [0, 1)
}

vec2 distort(in vec2 uv) {
  float t = time * .2 + length(uv - .5) * .00001;
  t *= nano(6.) * .1;
  uv = mat2(cos(t), -sin(t), sin(t), cos(t)) * (uv - .5) + .5;
  return vec2(
    uv.x + sin(uv.y * 20. + time) * .02 * cos(uv.y + uv.x * 20.),
    uv.y + sin((uv.x + sin(time * .01) * 2.) * uv.y * .03 * time) * .02
  );
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  float t = floor(nano(0.) * 10.);
  if (t == 0.) gl_FragColor = texture2D(image01, uv);
  if (t == 1.) gl_FragColor = texture2D(image02, uv);
  if (t == 2.) gl_FragColor = texture2D(image03, uv);
  if (t == 3.) gl_FragColor = texture2D(image04, uv);
  if (t == 4.) gl_FragColor = texture2D(image05, uv);
  if (t == 5.) gl_FragColor = texture2D(image06, uv);
  if (t == 6.) gl_FragColor = texture2D(image07, uv);
  if (t == 7.) gl_FragColor = texture2D(image08, uv);
  if (t == 8.) gl_FragColor = texture2D(image09, uv);
  if (t == 9.) gl_FragColor = texture2D(image10, uv);

  vec4 back = texture2D(backbuffer, uv);
  gl_FragColor = mix(gl_FragColor, back, .4);

  vec4 back2 = texture2D(backbuffer, distort(uv));
  float m = nano(7.);
  gl_FragColor /= (1.- m) + back2 * m;
}
















































