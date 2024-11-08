import { useState, useEffect, useCallback, useRef } from "react";

interface VirtualScrollResult<T> {
  visibleItems: T[];
  containerRef: React.RefObject<HTMLDivElement>;
  handleScroll: () => void;
  startIndex: number;
}

function useVirtualScroll<T>(
  items: T[],
  itemHeight: number,
  itemsPerBatch: number
): VirtualScrollResult<T> {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState<T[]>(
    items.slice(0, itemsPerBatch)
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const newStartIndex = Math.floor(scrollTop / itemHeight);

      if (newStartIndex !== startIndex) {
        setStartIndex(newStartIndex);
      }
    }
  }, [itemHeight, startIndex]);

  useEffect(() => {
    setVisibleItems(items.slice(startIndex, startIndex + itemsPerBatch));
  }, [startIndex, items, itemsPerBatch]);

  return { visibleItems, containerRef, handleScroll, startIndex };
}

export default useVirtualScroll;
