import React, { createContext, ReactNode, useContext, useState } from "react";

interface ImageState {
  imageName: string;
  imageSrc: null | string;
}

interface ImageContextProps extends ImageState {
  setImageState: React.Dispatch<React.SetStateAction<ImageState>>;
}

const ImageContext = createContext<ImageContextProps>({
  imageSrc: null,
  imageName: "",
  setImageState: () => {},
});

interface ProviderProps {
  children: ReactNode;
}

const ImageContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [imageState, setImageState] = useState<ImageState>({
    imageName: "",
    imageSrc: null,
  });

  return (
    <ImageContext.Provider
      value={{
        ...imageState,
        setImageState,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

const useImage = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImage must be used within an ImageContextProvider");
  }
  return context;
};

export { ImageContextProvider, useImage };
