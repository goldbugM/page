import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import "./MasonryGallery.css";
import BlurText from "../react-bits/BlurText";

interface MasonryItem {
  id: string;
  src: string;
  alt: string;
  title?: string;
  category?: string;
  description?: string;
  height?: number;
  serviceId?: string;
}

interface MasonryGalleryProps {
  items: MasonryItem[];
  columns?: number[];
  gap?: number;
  className?: string;
  onServiceClick?: (serviceId: string) => void;
}

const useMedia = (queries: string[], values: number[], defaultValue: number) => {
  const get = () =>
    values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;

  const [value, setValue] = useState(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach((q) => matchMedia(q).addEventListener("change", handler));
    return () =>
      queries.forEach((q) =>
        matchMedia(q).removeEventListener("change", handler)
      );
  }, [queries, values, defaultValue]);

  return value;
};

const useMeasure = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

export const MasonryGallery: React.FC<MasonryGalleryProps> = ({
  items,
  columns = [1, 2, 3, 4],
  gap = 16,
  className = "",
  onServiceClick
}) => {
  const [containerRef, { width }] = useMeasure();
  const cols = useMedia(
    ["(min-width: 1200px)", "(min-width: 900px)", "(min-width: 600px)"],
    columns.slice(1),
    columns[0]
  );

  const [heights, setHeights] = useState<number[]>([]);

  const gridItems = useMemo(() => {
    if (!width || cols === 0) return [];

    const colWidth = (width - gap * (cols - 1)) / cols;
    const colHeights = new Array(cols).fill(0);
    
    return items.map((item, index) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (colWidth + gap);
      const y = colHeights[col];
      
      // Calculate height based on aspect ratio or use provided height
      const aspectRatio = item.height ? item.height / 450 : Math.random() * 0.3 + 0.45;
      const height = colWidth * aspectRatio;
      
      colHeights[col] += height + gap;

      return {
        ...item,
        x,
        y,
        width: colWidth,
        height,
        col,
      };
    });
  }, [items, width, cols, gap]);

  useEffect(() => {
    if (gridItems.length > 0) {
      const maxHeight = Math.max(...gridItems.map(item => item.y + item.height));
      setHeights([maxHeight]);
    }
  }, [gridItems]);

  return (
    <div className={`masonry-container ${className}`}>
      <div
        ref={containerRef}
        className="masonry-grid"
        style={{ height: heights[0] || 'auto' }}
      >
        {gridItems.map((item, index) => (
          <div
            key={item.id}
            className="masonry-item"
            style={{
              transform: `translate3d(${item.x}px, ${item.y}px, 0)`,
              width: item.width,
              height: item.height,
            }}
          >
            <div className="masonry-item-content">
              <img
                src={item.src}
                alt={item.alt}
                className="masonry-image"
                loading="lazy"
              />
              {(item.title || item.category) && (
                <div className="masonry-overlay">
                  {item.category && (
                    <span className="masonry-category">{item.category}</span>
                  )}
                  {item.title && (
                    <div style={{
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                      hyphens: 'auto',
                      maxWidth: '100%',
                      overflow: 'visible'
                    }}>
                      <BlurText
                        className="masonry-title"
                        animateBy="words"
                        delay={150 + (index * 50)}
                        threshold={0.3}
                        stepDuration={0.4}
                      >
                        {item.title}
                      </BlurText>
                    </div>
                  )}
                  {item.description && (
                    <BlurText
                      className="masonry-description"
                      animateBy="words"
                      delay={100 + (index * 40)}
                      threshold={0.4}
                      stepDuration={0.3}
                    >
                      {item.description}
                    </BlurText>
                  )}
                  {item.serviceId && onServiceClick && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onServiceClick(item.serviceId!);
                      }}
                      className="masonry-button"
                    >
                      Mehr erfahren
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
