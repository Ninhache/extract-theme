import { KonvaEventObject } from "konva/lib/Node";
import { Group, Image as KonvaImage, Layer, Rect, Stage } from "react-konva";
import useImage from "use-image";
import { useData } from "./contexts/DataProvider";

interface KonvasProps {
  imageSrc: string;
}

function Konvas({ imageSrc }: KonvasProps): JSX.Element {
  const [image] = useImage(imageSrc);
  const { markers, addMarker } = useData();

  if (!image) {
    return <div>Loading...</div>;
  }

  const handleGroupClick = (e: KonvaEventObject<MouseEvent>) => {
    const group = e.target.getStage();
    if (group) {
      const relativePos = group.getRelativePointerPosition();
      if (!relativePos) {
        console.error("Relative position is null");
      } else {
        const { x, y } = relativePos;
        console.error("Relative position is not null");
        addMarker(x, y);
      }
    } else {
      console.error("Group is missing!");
    }
  };

  console.log("gaga", markers);

  return (
    <div>
      <Stage
        width={image?.width}
        height={image?.height}
        style={{ border: "1px solid black" }}
      >
        <Layer>
          <Group onClick={handleGroupClick}>
            <KonvaImage image={image} />
            {markers.map((marker) => (
              <Rect
                key={marker.index}
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
    </div>
  );
}

export default Konvas;
