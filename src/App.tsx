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
    <div className="flex justify-center items-center bg-primary/20 w-screen h-screen">
      {!imageSrc ? (
        <Button variant="primary" onClick={openFileDialog} className="relative">
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
          </span>
          Select an image:
        </Button>
      ) : (
        <DataContextProvider>
          <div className="flex overflow-hidden h-full w-full">
            <LeftSide imageSrc={imageSrc} />
            <Konvas imageSrc={imageSrc} />
          </div>
        </DataContextProvider>
      )}
    </div>
  );
}

export default App;
