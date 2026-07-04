import styles from "./Chip.module.css";
import type { ButtonHTMLAttributes } from "react";

type TChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
};

const Chip = (props: TChipProps) => {
  const { children, selected = false, type = "button", ...buttonProps } = props;

  const chipClassName = selected
    ? `${styles.chip} ${styles.selected}`
    : styles.chip;

  return (
    <button {...buttonProps} className={chipClassName} type={type}>
      {children}
    </button>
  );
};

export default Chip;
