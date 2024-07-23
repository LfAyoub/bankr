import { useState } from "react";

import styles from "./SortSelect.module.css";
import { useSortType } from "../contexts/SortTypeContext";

function SortSelect() {
  const { sortType, setSortType } = useSortType();

  return (
    <div className={styles.selectContainer}>
      <select
        className={styles.sortSelect}
        onChange={(e) => setSortType(e.target.value)}
      >
        <option value="all">All</option>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
    </div>
  );
}

export default SortSelect;
