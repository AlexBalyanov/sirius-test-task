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
  const [selectedId, setSelectedId] = useState<string>();
  console.log(selectedId);

  return (
    <main className={styles.container}>
      <ChipList
        items={chipsListData}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
    </main>
  );
};

export default App;
