"use client"
import { useState } from "react";
import styles from "./Dropdown.module.css"
// import { Arrow } from "../Arrow";

export function Dropdown(props: any) {
  const [value, setValue] = useState("halfyear");
  // const [isActive, setIsActive] = useState(false);

  // const handleClick = () => {
  //   setIsActive(current => !current);
  // }

  return (
    <div className={styles.dropdown}>
      <select value={value}
        // className={isActive ? `${styles.select} arrow_rotate` : `${styles.select}`} onClick={handleClick}
        className={styles.select}
        onChange={(e) => {
          setValue(e.target.value);
          props.childToParent(e.target.value);
        }}>
        <option value={"halfyear"}>За последние 6 месяцев</option>
        <option value={"month"}>За последний месяц</option>
        <option value={"year"}>За последний год</option>
      </select>
    </div>
  )
}
