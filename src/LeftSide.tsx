import { readFile } from "@tauri-apps/plugin-fs";
import { Download, EyeIcon, EyeOff, Upload } from "lucide-react";

import Button from "./components/button";
import { Separator } from "./components/separator";
import { useData } from "./contexts/DataProvider";
import { useImage } from "./contexts/ImageProvider";
import LazyRenderItems from "./LazyRenderItems";
import {
  createBlobURL,
  openFile,
  readFileContentAsString,
  saveFile,
} from "./lib/utils";

function LeftSide({}): JSX.Element {
  const { setImageState, imageName } = useImage();
  const { markers, loadJson, clearMarkers, setAllVisible, allVisible } =
    useData();

  const openImageDialog = async () => {
    const selectedFile = await openFile("Image", "All");
    // console.log("selectedFile", selectedFile);
    if (selectedFile) {
      const fileContent = await readFile(selectedFile);
      const imageURL = createBlobURL(fileContent, "image/png");

      // @ts-ignore
      const splittedName = selectedFile.split(window.__TAURI__.path.sep());
      const imageName = splittedName[splittedName.length - 1];

      setImageState({
        imageName: imageName,
        imageSrc: imageURL,
      });
      clearMarkers();
    }
  };

  const openJsonDialog = async () => {
    const selectedJson = await openFile("Json", "All");

    if (selectedJson) {
      const fileContent = await readFile(selectedJson);
      loadJson(readFileContentAsString(fileContent));
    }
  };

  const saveJsonDialog = async () => {
    console.log("saveJsonDialog");
    const simplifiedJson = Array.from(markers.values()).map((marker) => {
      return {
        label: marker.label,
        height: marker.height,
        width: marker.width,
        x: marker.x,
        y: marker.y,
      };
    });

    await saveFile(
      "Export JSON",
      JSON.stringify(simplifiedJson),
      "Json",
      "All"
    );
  };

  return (
    <div className="min-w-80 w-1/4 bg-primary/80 sticky left-0 z-10 p-2 overflow-y-scroll">
      <div className="text-primary-foreground text-md text-center truncate text-ellipsis">
        {imageName}
      </div>
      <div className="grid grid-cols-2 gap-2 p-2">
        <Button variant="primary" onClick={openImageDialog}>
          <Download className="mr-2 h-4 w-4" />
          Open Image
        </Button>
        <Button variant="primary" onClick={openJsonDialog}>
          <Download className="mr-2 h-4 w-4" />
          Open JSON
        </Button>
        <Button
          variant="primary"
          onClick={() => saveJsonDialog()}
          disabled={!(markers.size > 0)}
        >
          <Upload className="mr-2 h-4 w-4" />
          Export json
        </Button>
        <Button
          variant={!allVisible ? "constructive" : "destructive"}
          onClick={() => {
            setAllVisible(!allVisible);
          }}
          disabled={!(markers.size > 0)}
        >
          {allVisible ? (
            <EyeOff className="mr-2 h-4 w-4" />
          ) : (
            <EyeIcon className="mr-2 h-4 w-4" />
          )}
          {allVisible ? "Hide" : "Show"} labels
        </Button>
      </div>
      <Separator />
      <LazyRenderItems />
    </div>
  );
}

export default LeftSide;
