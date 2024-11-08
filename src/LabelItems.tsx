import { EyeIcon, EyeOff, Trash } from "lucide-react";
import Button from "./components/button";
import Input from "./components/input";
import Label from "./components/label";
import { NumberInput } from "./components/numberInput";
import { Marker, useData } from "./contexts/DataProvider";
import { cn } from "./lib/utils";

interface LabelItemProps {
  marker: Marker;
}

function LabelItem({ marker }: LabelItemProps): JSX.Element {
  const { id, label, x, y, width, height, visible } = marker;
  const { updateMarker, deleteMarker, allVisible } = useData();

  // useEffect(() => {}, [markers]);
  const isVisible = allVisible && visible;

  return (
    <div
      className={cn(
        "my-2 p-4 bg-primary/80 text-primary-foreground rounded-lg shadow-lg transition-opacity duration-150",
        !isVisible && "opacity-50"
      )}
    >
      <div className="flex items-center gap-4 mb-2">
        <Input
          type="text"
          defaultValue={label}
          placeholder="Label text"
          onChange={(e) => {
            updateMarker(id, "label", e.target.value);
          }}
        />
        <div className="flex gap-2">
          <Button
            onClick={(_) => {
              updateMarker(id, "visible", !visible);
            }}
          >
            {isVisible ? <EyeIcon /> : <EyeOff />}
          </Button>
          <Button
            variant="destructive"
            size="default"
            onClick={() => deleteMarker(id)}
          >
            <Trash />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center space-x-2">
          <Label htmlFor={`x-${id}`} className="w-8">
            X
          </Label>
          <NumberInput
            min={0}
            value={x}
            onValueChange={(e) => updateMarker(id, "x", e || 0)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor={`y-${id}`} className="w-8">
            Y
          </Label>
          <NumberInput
            min={0}
            value={y}
            onValueChange={(e) => updateMarker(id, "y", e || 0)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor={`width-${id}`} className="w-8">
            W
          </Label>
          <NumberInput
            min={0}
            value={width}
            onValueChange={(e) => updateMarker(id, "width", e || 0)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor={`height-${id}`} className="w-8">
            H
          </Label>
          <NumberInput
            min={0}
            value={height}
            onValueChange={(e) => updateMarker(id, "height", e || 0)}
          />
        </div>
      </div>
    </div>
  );
}

export default LabelItem;
