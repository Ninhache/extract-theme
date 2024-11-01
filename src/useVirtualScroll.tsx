import { useState, useEffect, useRef } from "react";

export const useVirtualScroll = (
  items: any[],
  itemHeight: number,
  itemsPerBatch: number
) => {
  const [visibleItems, setVisibleItems] = useState<any[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const scrollTop = container.scrollTop;
      const visibleHeight = container.clientHeight;
      const calculatedStartIndex = Math.floor(scrollTop / itemHeight);
      setStartIndex(calculatedStartIndex);
    }
  };

  useEffect(() => {
    const endIndex = Math.min(startIndex + itemsPerBatch, items.length);
    setVisibleItems(items.slice(startIndex, endIndex));
  }, [startIndex, items]);

  return {
    visibleItems,
    containerRef,
    handleScroll,
    startIndex,
  };
};
