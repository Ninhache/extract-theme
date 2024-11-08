import "./App.css";

import { readFile } from "@tauri-apps/plugin-fs";
import Button from "./components/button";
import { useImage } from "./contexts/ImageProvider";
import LeftSide from "./LeftSide";
import { createBlobURL, openFile } from "./lib/utils";
import { DataContextProvider } from "./contexts/DataProvider";
import Konvas from "./Konvas";

function App() {
  const { imageSrc, setImageState } = useImage();

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
    <div>
      {!imageSrc ? (
        <Button variant="primary" onClick={openFileDialog}>
          Select an image:
        </Button>
      ) : (
        <DataContextProvider>
          <div className="flex overflow-hidden w-screen h-screen">
            <LeftSide imageSrc={imageSrc} />
            <Konvas imageSrc={imageSrc} />
          </div>
        </DataContextProvider>
      )}
    </div>
  );
}

export default App;
