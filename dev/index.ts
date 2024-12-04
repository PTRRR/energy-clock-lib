import { createClock, defaultFragmentHeader, RadialChart } from "../lib";

createClock((clock) => {
  const radius = clock.width * 0.5;

  const customFragmentShader = `
    ${defaultFragmentHeader}

    uniform float uTime;

    void main() {
      float dist = length(uv - vec2(0.5, 0.5)) * 2.0;
      float waves = sin(dist * 1.5 * PI * 2.0 - uTime) * 0.1 * (1.0 - dist);
      vec2 centeredUV = uv - vec2(0.5);
      float angle = atan(centeredUV.y, centeredUV.x);
      float normalizedAngle = (angle + PI) / (2.0 * PI) + waves;
      float radialLines = abs((fract(normalizedAngle * 5.0) - 0.5)) * 2.0;
      float halfChange = fwidth(radialLines) / 2.0;
      float lowerEdge = 0.5 - halfChange * 1.5;
      float upperEdge = 0.5 + halfChange * 1.5;
      float step = smoothstep(lowerEdge, upperEdge, radialLines);
      fragColor = vec4(mix(vec4(45.0 / 255.0, 0.0 / 255.0, 247.0 / 255.0, 1.0), vec4(59.0 / 255.0, 170.0 / 255.0, 64.0 / 255.0, 1.0), step));
    }
`;

  clock.addRadialChart(new Array(100).fill(radius * 0.8), {
    subdivisions: 5,
    fragmentShader: customFragmentShader,
    label: "chart",
    resources: {
      time: {
        uTime: {
          value: 0.0,
          type: "f32",
        },
      },
    },
  });

  clock.addRectangles({
    count: 12,
    width: 3,
    height: 30,
    offset: 20,
  });

  clock.addCustomShape({
    count: 12,
    handler: async (index, instance) => {
      return instance.createTextElement({
        text: `${index.toString().padStart(2, "0")}`,
        fontSize: 20,
        offset: 10,
      });
    },
  });

  const chart = clock.getLayerByLabel("chart") as RadialChart;

  clock.addAnimation({
    duration: 5000,
    handler: () => {
      if (
        typeof chart?.mesh.shader?.resources.time.uniforms.uTime === "number"
      ) {
        chart.mesh.shader.resources.time.uniforms.uTime += 0.01;
      }
    },
  });
});
