import { readFile } from "@tauri-apps/plugin-fs";
import Button from "./components/button";
import { useData } from "./contexts/DataProvider";
import { useImage } from "./contexts/ImageProvider";
import Konvas from "./Konvas";
import LazyRenderItems from "./LazyRenderItems";
import { createBlobURL, openFile, readFileContentAsString } from "./lib/utils";

interface LeftProps {
  imageSrc: string;
}

function LeftSide({ imageSrc }: LeftProps): JSX.Element {
  const { setImageState } = useImage();
  const { markers, loadJson } = useData();

  const openImageDialog = async () => {
    const selectedImage = await openFile("Image", "All");

    if (selectedImage) {
      const fileContent = await readFile(selectedImage);
      const imageURL = createBlobURL(fileContent, "image/png");
      setImageState({
        imageSrc: imageURL,
      });
    }
  };

  const openJsonDialog = async () => {
    const selectedJson = await openFile("Json", "All");

    if (selectedJson) {
      const fileContent = await readFile(selectedJson);
      loadJson(readFileContentAsString(fileContent));
    }
  };

  return (
    <div className="flex overflow-hidden">
      <div className="min-w-80 w-1/4 bg-slate-500  sticky left-0 z-10 ">
        <Button variant="primary" onClick={openImageDialog}>
          Open image:
        </Button>
        <Button variant="primary" onClick={openJsonDialog}>
          Open json
        </Button>
        <Button variant="primary" disabled>
          Turn off labels
        </Button>
        <Button variant="primary" disabled>
          Export json
        </Button>

        {}
        <LazyRenderItems items={Array.from(markers.values())} />
      </div>
      <Konvas imageSrc={imageSrc} />
    </div>
  );
}

export default LeftSide;
