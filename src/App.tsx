import "./App.css";

import { readFile } from "@tauri-apps/plugin-fs";
import Button from "./components/button";
import { DataContextProvider } from "./contexts/DataProvider";
import { useImage } from "./contexts/ImageProvider";
import LeftSide from "./LeftSide";
import { createBlobURL, openFile } from "./lib/utils";

// import path from "path";
import Balancer from "react-wrap-balancer";
import Konvas from "./Konvas";

function App() {
  const { imageSrc, setImageState } = useImage();

  const openFileDialog = async () => {
    const selectedFile = await openFile("Image", "All");
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
    }
  };

  return (
    <div className="flex justify-center items-center bg-primary/20 w-screen h-screen">
      {!imageSrc ? (
        <div className="text-center flex flex-col gap-2 justify-center items-center max-w-80">
          <Button
            variant="primary"
            onClick={openFileDialog}
            className="relative "
          >
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
            Select an image :
          </Button>
          <p className="text-muted-foreground animate-pulsec">
            <Balancer>Open an image to start the extract process</Balancer>
          </p>
        </div>
      ) : (
        <DataContextProvider>
          <div className="flex overflow-hidden h-full w-full">
            <LeftSide />
            <Konvas imageSrc={imageSrc} />
          </div>
        </DataContextProvider>
      )}
    </div>
  );
}

export default App;
