import styles from "./App.module.css";
import { type ChangeEvent, useState } from "react";
import ChipList, {
  type TChipListItem,
} from "../components/ChipList/ChipList.tsx";

const chipsListData: TChipListItem[] = Array.from(
  { length: 20 },
  (_, index) => ({
    id: String(index),
    label: `Чипс ${index + 1}`,
  }),
);

const DEFAULT_CONTAINER_WIDTH = 740;
const MIN_CONTAINER_WIDTH = 240;
const MAX_CONTAINER_WIDTH = 1920;

const App = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [containerWidthValue, setContainerWidthValue] = useState("740");
  const parsedContainerWidth = Number(containerWidthValue);
  const containerWidth =
    containerWidthValue === "" || !Number.isFinite(parsedContainerWidth)
      ? DEFAULT_CONTAINER_WIDTH
      : Math.min(
          Math.max(parsedContainerWidth, MIN_CONTAINER_WIDTH),
          MAX_CONTAINER_WIDTH,
        );

  const handleSelect = (id: string) => {
    setSelectedIds((currentIds) => {
      if (currentIds.includes(id)) {
        return currentIds.filter((currentId) => currentId !== id);
      }

      return [...currentIds, id];
    });
  };

  const handleContainerWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContainerWidthValue(event.target.value);
  };

  return (
    <main className={styles.container}>
      <label className={styles.field}>
        <span>Ширина контейнера</span>

        <input
          className={styles.input}
          max={MAX_CONTAINER_WIDTH}
          min={MIN_CONTAINER_WIDTH}
          onChange={handleContainerWidthChange}
          step={20}
          type="number"
          value={containerWidthValue}
        />
      </label>

      <div className={styles.chipListWrapper} style={{ width: containerWidth }}>
        <ChipList
          items={chipsListData}
          selectedIds={selectedIds}
          onSelect={handleSelect}
        />
      </div>
    </main>
  );
};

export default App;
