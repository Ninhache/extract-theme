import React, { useMemo } from "react";
import LabelItem from "./LabelItems";

import { useData } from "./contexts/DataProvider";

const LazyRenderItems: React.FC<{}> = ({}) => {
  const { markers } = useData();

  const memoizedArray = useMemo(() => {
    return Array.from(markers.values());
  }, [markers]);

  return (
    <div className="overflow-y-auto">
      {memoizedArray.map((marker, index) => (
        <LabelItem key={index} marker={marker} />
      ))}
    </div>
  );
};

export default LazyRenderItems;
