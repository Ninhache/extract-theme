import { KonvaEventObject } from "konva/lib/Node";
import { Group, Image as KonvaImage, Layer, Rect, Stage } from "react-konva";

import Konva from "konva";
import { useEffect, useRef } from "react";
import { useRealImage } from "./@types/misc";
import { useData } from "./contexts/DataProvider";

interface KonvasProps {
  imageSrc: string;
}

function Konvas({ imageSrc }: KonvasProps): JSX.Element {
  const [image] = useRealImage(imageSrc);
  const { markers, addMarker, allVisible } = useData();
  const layerRef = useRef<Konva.Layer | null>(null);

  useEffect(() => {
    if (layerRef.current) {
      layerRef.current.getLayer().batchDraw();
    }
  }, [markers]);

  if (!image) {
    return <div>Loading...</div>;
  }

  const handleGroupClick = (e: KonvaEventObject<MouseEvent>) => {
    const group = e.target.getStage();
    if (group) {
      const relativePos = group.getRelativePointerPosition();
      if (relativePos) {
        const { x, y } = relativePos;
        addMarker(x, y);
      } else {
        console.error("Relative position is null");
      }
    } else {
      console.error("Group is missing!");
    }
  };

  return (
    <Stage
      width={image.width}
      height={image.height}
      className="border border-black overflow-scroll"
    >
      <Layer ref={layerRef}>
        <Group onClick={handleGroupClick}>
          <KonvaImage image={image} />
          {allVisible &&
            Array.from(markers.values())
              .filter((marker) => marker.visible)
              .map((marker, index) => (
                <Rect
                  key={index}
                  x={marker.x}
                  y={marker.y}
                  width={marker.width}
                  height={marker.height}
                  stroke="red"
                  strokeWidth={2}
                />
              ))}
        </Group>
      </Layer>
    </Stage>
  );
}

export default Konvas;
