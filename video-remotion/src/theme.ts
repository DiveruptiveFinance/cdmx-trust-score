export const COLORS = {
  paper: "#FFFCF5",
  paperElev: "#FAF4E3",
  ink: "#1A1A1A",
  inkMuted: "#4A4A4A",
  primary: "#D62987",
  primaryLight: "#E0479F",
  accent: "#F1B12B",
  violet: "#86299C",
  success: "#286634",
  danger: "#C0000A",
  border: "#E8E0CC",
};

export const FONTS = {
  display: '"Fraunces", "Times New Roman", serif',
  body: '"Inter", -apple-system, system-ui, sans-serif',
};

export const VIDEO = {
  width: 1920,
  height: 1080,
  fps: 60,
  durationInFrames: 7200, // 120s @ 60fps
};

export const SCENES = {
  scene1: { from: 0, duration: 720 },      // 0:00–0:12
  scene2: { from: 720, duration: 1080 },   // 0:12–0:30
  scene3: { from: 1800, duration: 1500 },  // 0:30–0:55
  scene4: { from: 3300, duration: 1800 },  // 0:55–1:25
  scene5: { from: 5100, duration: 1200 },  // 1:25–1:45
  scene6: { from: 6300, duration: 900 },   // 1:45–2:00
};
