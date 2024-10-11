import "./App.css";

import { useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import { readFile } from "@tauri-apps/plugin-fs";
import Button from "./components/button";

// const matches = await getMatches();
// console.log(matches);
// if (matches.subcommand?.name === "image") {
//   // `./your-app run $ARGS` was executed
//   const args = matches.subcommand.matches.args;
//   if (args.debug?.value === true) {
//     // `./your-app run --debug` was executed
//   }
//   if (args.release?.value === true) {
//     // `./your-app run --release` was executed
//   }
// }

function App() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  // const [bla, setBla] = useState<string>();
  // console.log("hello world 1");
  // getMatches().then((matches) => {
  //   console.log("hello world 2", matches);
  //   // {args: {image: {value: null, occurrences: 0}}, subcommand: null}
  //   const args = matches.args;
  //   // @ts-ignore
  //   console.log("matches.args.name === hello", args.image.value);
  //   // @ts-ignore
  //   setBla(`${args.image.value ?? "pas de valeur"}`);
  // });
  const openFileDialog = async () => {
    console.log("open");
    // Ouvre le dialogue de fichiers pour sélectionner une image
    const selectedFile = await open({
      filters: [
        {
          name: "Image",
          extensions: ["png", "jpg", "jpeg", "gif"],
        },
      ],
    });

    if (selectedFile) {
      // Si un fichier est sélectionné, charge son contenu
      const fileContent = await readFile(selectedFile);

      // Convertit le contenu binaire en URL d'image utilisable par React
      const blob = new Blob([new Uint8Array(fileContent)], {
        type: "image/png",
      });
      const imageURL = URL.createObjectURL(blob);
      setImageSrc(imageURL);
    }
  };

  return (
    <div className="container">
      <Button variant="secondary" onClick={openFileDialog}>
        Blabla:
      </Button>
      {imageSrc && <img src={imageSrc} alt="Selected" />}
    </div>
  );
}

export default App;
