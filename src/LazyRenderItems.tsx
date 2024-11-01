import React from "react";
import { useVirtualScroll } from "./useVirtualScroll";
import { Marker } from "./contexts/DataProvider";
import LabelItem from "./LabelItems";

interface LazyRenderItemsProps {
  items: Marker[];
}

const LazyRenderItems: React.FC<LazyRenderItemsProps> = ({ items }) => {
  const itemHeight = 170;
  const itemsPerBatch = 10;

  const { visibleItems, containerRef, handleScroll, startIndex } =
    useVirtualScroll(items, itemHeight, itemsPerBatch);

  return (
    <div
      ref={containerRef}
      style={{
        height: "800px",
        overflowY: "scroll",
        // border: "1px solid #ccc",
        position: "relative",
      }}
      onScroll={handleScroll}
    >
      <div
        style={{
          height: `${items.length * itemHeight}px`,
          position: "relative",
        }}
      >
        {visibleItems.map((marker, index) => (
          <div
            key={marker.id}
            style={{
              height: `${itemHeight}px`,
              position: "absolute",
              top: `${(startIndex + index) * itemHeight}px`,
              width: "100%",
              padding: "10px",
            }}
          >
            <LabelItem marker={marker} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LazyRenderItems;
