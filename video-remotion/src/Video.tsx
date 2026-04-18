import { AbsoluteFill, Sequence } from "remotion";
import { loadFont as loadFraunces } from "@remotion/google-fonts/Fraunces";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { SCENES } from "./theme";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Agitacion } from "./scenes/Scene2Agitacion";
import { Scene3Guia } from "./scenes/Scene3Guia";
import { Scene4Plan } from "./scenes/Scene4Plan";
import { Scene5Agente } from "./scenes/Scene5Agente";
import { Scene6Cierre } from "./scenes/Scene6Cierre";

loadFraunces();
loadInter();

export const Video: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={SCENES.scene1.from} durationInFrames={SCENES.scene1.duration}>
        <Scene1Hook />
      </Sequence>
      <Sequence from={SCENES.scene2.from} durationInFrames={SCENES.scene2.duration}>
        <Scene2Agitacion />
      </Sequence>
      <Sequence from={SCENES.scene3.from} durationInFrames={SCENES.scene3.duration}>
        <Scene3Guia />
      </Sequence>
      <Sequence from={SCENES.scene4.from} durationInFrames={SCENES.scene4.duration}>
        <Scene4Plan />
      </Sequence>
      <Sequence from={SCENES.scene5.from} durationInFrames={SCENES.scene5.duration}>
        <Scene5Agente />
      </Sequence>
      <Sequence from={SCENES.scene6.from} durationInFrames={SCENES.scene6.duration}>
        <Scene6Cierre />
      </Sequence>
    </AbsoluteFill>
  );
};
