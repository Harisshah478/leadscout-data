(function () {
  "use strict";

  var canvas = document.querySelector(".hero__canvas");
  if (!canvas) return;

  var gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
  if (!gl) {
    canvas.remove();
    var heroFallback = document.querySelector(".hero--webgl");
    if (heroFallback) heroFallback.classList.remove("hero--webgl");
    return;
  }

  var vert = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
  var frag = [
    "precision mediump float;",
    "uniform vec2 u_res;",
    "uniform float u_time;",
    "float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}",
    "float noise(vec2 p){",
    "  vec2 i=floor(p),f=fract(p);",
    "  f=f*f*(3.-2.*f);",
    "  return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);",
    "}",
    "float fbm(vec2 p){",
    "  float v=0.,a=.5;",
    "  for(int i=0;i<4;i++){v+=a*noise(p);p=p*2.+vec2(1.7,9.2);a*=.5;}",
    "  return v;",
    "}",
    "void main(){",
    "  vec2 uv=gl_FragCoord.xy/u_res;",
    "  uv.x*=u_res.x/u_res.y;",
    // Diagonal flow: rotate the domain, then warp it twice with fbm.
    "  vec2 p=vec2(uv.x*.9+uv.y*.6,uv.y*.9-uv.x*.4)*1.6;",
    "  float t=u_time*.06;",
    "  vec2 q=vec2(fbm(p+t),fbm(p+vec2(5.2,1.3)-t));",
    "  vec2 r=vec2(fbm(p+3.*q+vec2(1.7,9.2)+t*1.3),fbm(p+3.*q+vec2(8.3,2.8)-t));",
    "  float f=fbm(p+3.*r);",
    "  vec3 c1=vec3(.04,.04,.06);",
    "  vec3 c2=vec3(.12,.15,.22);",
    "  vec3 c3=vec3(.35,.35,.40);",
    "  vec3 col=mix(c1,c2,smoothstep(.2,.8,f));",
    "  float streak=smoothstep(.55,.9,length(q))*smoothstep(.4,.9,r.x);",
    "  col=mix(col,c3,streak*.45);",
    // Fade into the page background (#0d0d0d) at the bottom edge.
    "  float fade=smoothstep(0.,.3,gl_FragCoord.y/u_res.y);",
    "  col=mix(vec3(.051),col,fade);",
    "  gl_FragColor=vec4(col,1.);",
    "}"
  ].join("\n");

  function compile(type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) return null;
    return s;
  }

  var vs = compile(gl.VERTEX_SHADER, vert);
  var fs = compile(gl.FRAGMENT_SHADER, frag);
  var prog = gl.createProgram();
  if (!vs || !fs) {
    canvas.remove();
    return;
  }
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    canvas.remove();
    return;
  }
  gl.useProgram(prog);

  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  var uRes = gl.getUniformLocation(prog, "u_res");
  var uTime = gl.getUniformLocation(prog, "u_time");

  // The shader is smooth, so render at a fraction of CSS pixels and let the
  // browser upscale it: much cheaper on phones and retina screens.
  var SCALE = 0.5;
  var dpr = Math.min(window.devicePixelRatio || 1, 1.5);

  function resize() {
    var w = Math.max(2, Math.round(canvas.clientWidth * dpr * SCALE));
    var h = Math.max(2, Math.round(canvas.clientHeight * dpr * SCALE));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
    gl.uniform2f(uRes, w, h);
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var visible = true;
  var raf = null;
  var t0 = performance.now();

  function draw(now) {
    raf = null;
    gl.uniform1f(uTime, reduceMotion ? 12 : (now - t0) / 1000);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (!reduceMotion && visible && !document.hidden) raf = window.requestAnimationFrame(draw);
  }

  function start() {
    if (raf === null) raf = window.requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", function () {
    resize();
    start();
  });

  if (reduceMotion) {
    start();
    return;
  }

  // Do not render while the hero is off-screen or the tab is hidden.
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) start();
    }).observe(canvas);
  }
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) start();
  });

  start();
})();
