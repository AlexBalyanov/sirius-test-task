import styles from "./ChipList.module.css";
import Chip from "../Chip/Chip.tsx";

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
  const { items, selectedIds, onSelect } = props;

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.id} className={styles.item}>
          <Chip
            selected={selectedIds?.includes(item.id)}
            onClick={() => onSelect(item.id)}
          >
            {item.label}
          </Chip>
        </li>
      ))}
    </ul>
  );
};

export default ChipList;
