import React, { createContext, ReactNode, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface Marker {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface DataContextProps {
  markers: Map<string, Marker>;
  setMarkers: React.Dispatch<React.SetStateAction<Map<string, Marker>>>;
  addMarker: (x: number, y: number) => void;
  updateMarker: (
    id: string,
    label: string,
    newX: number,
    newY: number,
    newWidth: number,
    newHeight: number
  ) => void;
  loadJson: (json: string) => void;
}

const DataContext = createContext<DataContextProps>({
  markers: new Map(),
  setMarkers: () => {},
  addMarker: () => {},
  updateMarker: () => {},
  loadJson: () => {},
});

interface ProviderProps {
  children: ReactNode;
}

const DataContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [markers, setMarkers] = useState<Map<string, Marker>>(new Map());
  const [lastMarkerId, setLastMarkerId] = useState<string | null>(null);

  const addMarker = (x: number, y: number) => {
    const id = uuidv4();

    setMarkers((prevMarkers) => {
      const lastMarker = lastMarkerId ? prevMarkers.get(lastMarkerId) : null;
      const width = lastMarker ? lastMarker.width : 25;
      const height = lastMarker ? lastMarker.height : 25;

      const newMarker = {
        id,
        label: "[NO_VALUE]",
        x,
        y,
        width,
        height,
      };

      const newMap = new Map(prevMarkers);
      newMap.set(id, newMarker);
      return newMap;
    });
    setLastMarkerId(id);
  };

  const updateMarker = (
    id: string,
    newLabel: string,
    newX: number,
    newY: number,
    newWidth: number,
    newHeight: number
  ) => {
    setMarkers((prevMarkers) => {
      if (!prevMarkers.has(id)) {
        return prevMarkers;
      }

      const updatedMarker = {
        id,
        label: newLabel,
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight,
      };

      const newMap = new Map(prevMarkers);
      newMap.set(id, updatedMarker);
      return newMap;
    });
  };

  const loadJson = (json: string) => {
    try {
      const decodedJson = JSON.parse(json);
      if (Array.isArray(decodedJson)) {
        setMarkers((prevMarkers) => {
          const newMap = new Map(prevMarkers);
          decodedJson.forEach((item) => {
            const id = uuidv4();
            const newMarker = {
              id,
              label: item.label ?? "[NO_VALUE]",
              x: item.x ?? 0,
              y: item.y ?? 0,
              width: item.width ?? 25,
              height: item.height ?? 25,
            };
            newMap.set(id, newMarker);
          });

          return newMap;
        });
      } else {
        console.error("The JSON content is not an array.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DataContext.Provider
      value={{ markers, setMarkers, addMarker, updateMarker, loadJson }}
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
