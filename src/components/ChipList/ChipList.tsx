import styles from "./ChipList.module.css";
import Chip from "../Chip/Chip.tsx";
import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { useLayoutEffect, useRef, useState } from "react";

export type TChipListItem = {
  id: string;
  label: string;
};

type TChipListProps = {
  items: TChipListItem[];
  selectedIds?: string[];
  onSelect: (id: string) => void;
};

const ChipList = (props: TChipListProps) => {
  const { items, selectedIds = [], onSelect } = props;

  const listRef = useRef<HTMLUListElement | null>(null);
  const measureListRef = useRef<HTMLUListElement | null>(null);
  const measureItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const measureMoreRef = useRef<HTMLLIElement | null>(null);

  const [listWidth, setListWidth] = useState(0);

  const [visibleCount, setVisibleCount] = useState(items.length);
  const visibleItems = items.slice(0, visibleCount);
  const hiddenItems = items.slice(visibleCount);

  useLayoutEffect(() => {
    const listElement = listRef.current;

    if (!listElement) return;

    const updateListWidth = () => {
      setListWidth(listElement.getBoundingClientRect().width);
    };

    updateListWidth();

    const observer = new ResizeObserver(updateListWidth);
    observer.observe(listElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    if (listWidth === 0) {
      return;
    }

    const measureListElement = measureListRef.current;

    if (!measureListElement) {
      return;
    }

    const gap = parseFloat(getComputedStyle(measureListElement).columnGap) || 0;

    const chipWidths = items.map((_, index) => {
      return measureItemsRef.current[index]?.getBoundingClientRect().width ?? 0;
    });

    const moreButtonWidth =
      measureMoreRef.current?.getBoundingClientRect().width ?? 0;

    for (let count = items.length; count >= 0; count -= 1) {
      const hiddenCount = items.length - count;

      const chipsWidth = chipWidths
        .slice(0, count)
        .reduce((sum, width) => sum + width, 0);

      const chipsGapsWidth = Math.max(count - 1, 0) * gap;

      const moreWidth =
        hiddenCount > 0 ? moreButtonWidth + (count > 0 ? gap : 0) : 0;

      const totalWidth = chipsWidth + chipsGapsWidth + moreWidth;

      if (totalWidth <= listWidth) {
        setVisibleCount(count);
        return;
      }
    }

    setVisibleCount(0);
  }, [items, listWidth]);

  return (
    <div className={styles.container}>
      <ul className={styles.list} ref={listRef}>
        {visibleItems.map((item) => (
          <li key={item.id} className={styles.item}>
            <Chip
              selected={selectedIds.includes(item.id)}
              onClick={() => onSelect(item.id)}
            >
              {item.label}
            </Chip>
          </li>
        ))}
        {hiddenItems.length > 0 && (
          <li className={styles.moreItem}>
            <Popover>
              <PopoverTrigger asChild>
                <button className={styles.moreButton} type="button">
                  ...
                </button>
              </PopoverTrigger>

              <PopoverPortal>
                <PopoverContent
                  className={styles.popup}
                  align="end"
                  side="bottom"
                  sideOffset={8}
                >
                  <ul className={styles.popupList}>
                    {hiddenItems.map((item) => (
                      <li key={item.id}>
                        <Chip
                          selected={selectedIds.includes(item.id)}
                          onClick={() => onSelect(item.id)}
                        >
                          {item.label}
                        </Chip>
                      </li>
                    ))}
                  </ul>
                </PopoverContent>
              </PopoverPortal>
            </Popover>
          </li>
        )}
      </ul>

      <ul className={styles.measureList} ref={measureListRef}>
        {items.map((item, index) => (
          <li
            key={item.id}
            ref={(element) => {
              measureItemsRef.current[index] = element;
            }}
          >
            <Chip>{item.label}</Chip>
          </li>
        ))}

        <li ref={measureMoreRef}>
          <button className={styles.moreButton} type="button">
            ...
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ChipList;
