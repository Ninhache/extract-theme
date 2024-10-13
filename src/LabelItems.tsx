import Input from "./components/input";
import Label from "./components/label";
import { NumberInput } from "./components/numberInput";
import { Marker, useData } from "./contexts/DataProvider";

interface LabelItemProps {
  marker: Marker;
}

function LabelItem({ marker }: LabelItemProps): JSX.Element {
  const { index, label, x, y, width, height } = marker;
  const { updateMarker } = useData();

  return (
    <div className="mb-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center">
        <div className="w-8 text-black/50">{index} - </div>
        <Input
          type="text"
          defaultValue={label}
          className="mb-2"
          placeholder="Label text"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center space-x-2">
          <Label htmlFor={`x-${index}`} className="w-8">
            X
          </Label>
          <NumberInput
            min={0}
            value={x}
            onValueChange={(e) =>
              updateMarker(index, label, e || 0, y, width, height)
            }
          />
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor={`y-${index}`} className="w-8">
            Y
          </Label>
          <NumberInput
            min={0}
            value={y}
            onValueChange={(e) =>
              updateMarker(index, label, x, e || 0, width, height)
            }
          />
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor={`width-${index}`} className="w-8">
            W
          </Label>
          <NumberInput
            min={0}
            value={width}
            onValueChange={(e) =>
              updateMarker(index, label, x, y, e || 0, height)
            }
          />
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor={`height-${index}`} className="w-8">
            H
          </Label>
          <NumberInput
            min={0}
            value={height}
            onValueChange={(e) =>
              updateMarker(index, label, x, y, width, e || 0)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default LabelItem;
