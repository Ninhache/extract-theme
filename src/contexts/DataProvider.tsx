import React, { createContext, ReactNode, useContext, useState } from "react";

export interface Marker {
  index: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface DataContextProps {
  markers: Map<number, Marker>;
  setMarkers: React.Dispatch<React.SetStateAction<Map<number, Marker>>>;
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
  markers: new Map(),
  setMarkers: () => {},
  addMarker: () => {},
  updateMarker: () => {},
});

interface ProviderProps {
  children: ReactNode;
}

const DataContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [markers, setMarkers] = useState<Map<number, Marker>>(new Map());

  const addMarker = (x: number, y: number) => {
    setMarkers((prevMarkers) => {
      const newMarker = {
        index: prevMarkers.size,
        x,
        y,
        width: 25,
        height: 25,
      };
      const newMap = new Map(prevMarkers);
      newMap.set(newMarker.index, newMarker);
      return newMap;
    });
  };

  const updateMarker = (
    index: number,
    newX: number,
    newY: number,
    newWidth: number,
    newHeight: number
  ) => {
    setMarkers((prevMarkers) => {
      if (!prevMarkers.has(index)) {
        return prevMarkers;
      }

      const updatedMarker = {
        index: index,
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight,
      };

      const newMap = new Map(prevMarkers);
      newMap.set(index, updatedMarker);
      return newMap;
    });
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
