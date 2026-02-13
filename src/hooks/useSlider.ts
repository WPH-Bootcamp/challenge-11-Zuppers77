import { useRef, useState, useCallback, RefObject } from "react";

interface UseSliderProps {
  onChange: (percentage: number) => void;
  onCommit?: (percentage: number) => void;
  disabled?: boolean;
}

interface UseSliderReturn {
  containerRef: RefObject<HTMLDivElement | null>;
  isDragging: boolean;
  handlers: {
    onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
    onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
    onPointerUp: (e: React.PointerEvent<HTMLDivElement>) => void;
    onPointerLeave: (e: React.PointerEvent<HTMLDivElement>) => void;
  };
}

export const useSlider = ({
  onChange,
  onCommit,
  disabled = false,
}: UseSliderProps): UseSliderReturn => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const calculatePercentage = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return 0;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const width = rect.width;
      return Math.min(100, Math.max(0, (x / width) * 100));
    },
    []
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    setIsDragging(true);
    const percentage = calculatePercentage(e.clientX);
    onChange(percentage);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || !isDragging) return;
    const percentage = calculatePercentage(e.clientX);
    onChange(percentage);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || !isDragging) return;
    setIsDragging(false);
    const percentage = calculatePercentage(e.clientX);
    if (onCommit) onCommit(percentage);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return {
    containerRef,
    isDragging,
    handlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerLeave: handlePointerUp,
    },
  };
};
