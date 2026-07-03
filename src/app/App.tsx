import Chip from "../components/Chip/Chip.tsx";
import styles from "./App.module.css";

const App = () => {
  const chipsList = new Array(30).fill("");

  return (
    <main>
      <ul className={styles.container}>
        {chipsList.map((_, index) => (
          <li>
            <Chip>{`Чипс-${index}`}</Chip>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default App;
