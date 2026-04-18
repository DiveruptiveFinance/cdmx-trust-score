import { Composition } from "remotion";
import { Video } from "./Video";
import { VIDEO } from "./theme";

export const Root: React.FC = () => {
  return (
    <Composition
      id="video"
      component={Video}
      durationInFrames={VIDEO.durationInFrames}
      fps={VIDEO.fps}
      width={VIDEO.width}
      height={VIDEO.height}
    />
  );
};
