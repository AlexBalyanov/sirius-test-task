import styles from "./App.module.css";
import { useState } from "react";
import ChipList, {
  type TChipListItem,
} from "../components/ChipList/ChipList.tsx";

const chipsListData: TChipListItem[] = Array.from(
  { length: 30 },
  (_, index) => ({
    id: String(index),
    label: `Чипс-${index}`,
  }),
);

const App = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    setSelectedIds((currentIds) => {
      if (currentIds.includes(id)) {
        return currentIds.filter((currentId) => currentId !== id);
      }

      return [...currentIds, id];
    });
  };

  console.log(selectedIds);

  return (
    <main className={styles.container}>
      <ChipList
        items={chipsListData}
        selectedIds={selectedIds}
        onSelect={handleSelect}
      />
    </main>
  );
};

export default App;
