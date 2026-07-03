import styles from "./ChipList.module.css";
import Chip from "../Chip/Chip.tsx";

export type TChipListItem = {
  id: string;
  label: string;
};

type TChipListProps = {
  items: TChipListItem[];
  selectedId?: string;
  onSelect: (id: string) => void;
};

const ChipList = (props: TChipListProps) => {
  const { items, selectedId, onSelect } = props;

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.id} className={styles.item}>
          <Chip
            selected={item.id === selectedId}
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
