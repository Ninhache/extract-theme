import { readFile } from "@tauri-apps/plugin-fs";
import Button from "./components/button";
import { useImage } from "./contexts/ImageProvider";
import Konvas from "./Konvas";
import { createBlobURL, openFile } from "./lib/utils";

interface LeftProps {
  imageSrc: string;
}

function LeftSide({ imageSrc }: LeftProps): JSX.Element {
  const { setImageState } = useImage();

  const openFileDialog = async () => {
    const selectedFile = await openFile("Image", "All");

    if (selectedFile) {
      const fileContent = await readFile(selectedFile);
      const imageURL = createBlobURL(fileContent, "image/png");
      setImageState({
        imageSrc: imageURL,
      });
    }
  };

  return (
    <div className="flex ">
      <div className="min-w-40 w-1/4 bg-slate-500 p-2 sticky left-0 z-10">
        <Button variant="primary" onClick={openFileDialog}>
          Select an image:
        </Button>
      </div>
      <Konvas imageSrc={imageSrc} />
    </div>
  );
}

export default LeftSide;
