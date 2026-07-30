import React, { useEffect, useRef } from 'react';

export default function CyberShaderBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId;
    let resizeObserver;

    try {
      function syncSize() {
        const w = canvas.clientWidth || window.innerWidth || 1280;
        const h = canvas.clientHeight || window.innerHeight || 720;
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }
      }

      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(syncSize);
        resizeObserver.observe(canvas);
      }
      syncSize();

      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) return;

      const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

      const fs = `precision mediump float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

void main() {
    vec2 uv = v_texCoord;
    vec2 p = (uv - 0.5) * 2.0;
    p.x *= u_resolution.x / u_resolution.y;
    
    vec3 color = vec3(0.02, 0.04, 0.08); // Deep navy base
    
    // Grid system
    vec2 grid_uv = uv * 30.0;
    vec2 grid_id = floor(grid_uv);
    vec2 grid_f = fract(grid_uv);
    
    float line = min(smoothstep(0.0, 0.05, grid_f.x), smoothstep(1.0, 0.95, grid_f.x));
    line = min(line, min(smoothstep(0.0, 0.05, grid_f.y), smoothstep(1.0, 0.95, grid_f.y)));
    
    color += vec3(0.0, 0.4, 0.8) * (1.0 - line) * 0.18;
    
    // Pulsing data flow lines
    float flow = sin(uv.y * 10.0 - u_time * 2.0) * 0.5 + 0.5;
    float flow_x = sin(uv.x * 5.0 + u_time) * 0.5 + 0.5;
    color += vec3(0.0, 0.6, 1.0) * flow * flow_x * 0.08;
    
    // Binary data clusters
    float cluster = hash(grid_id + floor(u_time * 0.5));
    if(cluster > 0.98) {
        float pulse = sin(u_time * 5.0 + hash(grid_id) * 10.0) * 0.5 + 0.5;
        color += vec3(0.2, 0.8, 1.0) * pulse * (1.0 - length(grid_f - 0.5) * 2.0);
    }
    
    // Vignette
    color *= 1.0 - length(uv - 0.5) * 1.2;
    
    gl_FragColor = vec4(color, 1.0);
}`;

      function cs(type, src) {
        const s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
          console.warn(gl.getShaderInfoLog(s));
          return null;
        }
        return s;
      }

      const vertShader = cs(gl.VERTEX_SHADER, vs);
      const fragShader = cs(gl.FRAGMENT_SHADER, fs);
      if (!vertShader || !fragShader) return;

      const prog = gl.createProgram();
      gl.attachShader(prog, vertShader);
      gl.attachShader(prog, fragShader);
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;

      gl.useProgram(prog);

      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

      const pos = gl.getAttribLocation(prog, 'a_position');
      gl.enableVertexAttribArray(pos);
      gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

      const uTime = gl.getUniformLocation(prog, 'u_time');
      const uRes = gl.getUniformLocation(prog, 'u_resolution');

      function render(t) {
        if (!canvas) return;
        gl.viewport(0, 0, canvas.width, canvas.height);
        if (uTime) gl.uniform1f(uTime, t * 0.001);
        if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        animId = requestAnimationFrame(render);
      }

      render(0);

      return () => {
        if (animId) cancelAnimationFrame(animId);
        if (resizeObserver) resizeObserver.disconnect();
      };
    } catch (err) {
      console.warn('WebGL Shader init warning:', err);
    }
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#060B13]">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
