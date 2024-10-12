import React, { createContext, ReactNode, useContext, useState } from "react";

interface Marker {
  index: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface DataContextProps {
  markers: Marker[];
  setMarkers: React.Dispatch<React.SetStateAction<Marker[]>>;
  addMarker: (x: number, y: number) => void;
  updateMarker: (
    index: number,
    newX: number,
    newY: number,
    newWidth: number,
    newHeight: number
  ) => void;
}

const DataContext = createContext<DataContextProps>({
  markers: [],
  setMarkers: () => {},
  addMarker: () => {},
  updateMarker: () => {},
});

interface ProviderProps {
  children: ReactNode;
}

const DataContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [markers, setMarkers] = useState<Marker[]>([]);

  const addMarker = (x: number, y: number) => {
    console.log("markers", markers);
    setMarkers((prevMarkers) => [
      ...prevMarkers,
      { index: prevMarkers.length, x, y, width: 25, height: 25 },
    ]);
  };

  const updateMarker = (
    index: number,
    newX: number,
    newY: number,
    newWidth: number,
    newHeight: number
  ) => {
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker) =>
        marker.index === index
          ? { ...marker, x: newX, y: newY, width: newWidth, height: newHeight }
          : marker
      )
    );
  };

  return (
    <DataContext.Provider
      value={{ markers, setMarkers, addMarker, updateMarker }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within an DataContextProvider");
  }
  return context;
};

export { DataContextProvider, useData };
