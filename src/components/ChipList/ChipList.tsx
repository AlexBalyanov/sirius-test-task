import styles from "./ChipList.module.css";
import Chip from "../Chip/Chip.tsx";
import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "@radix-ui/react-popover";

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

  const visibleCount = 5;
  const visibleItems = items.slice(0, visibleCount);
  const hiddenItems = items.slice(visibleCount);

  return (
    <ul className={styles.list}>
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
  );
};

export default ChipList;
