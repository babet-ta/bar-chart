"use client"
import { useState, useEffect } from "react";
import styles from "./Dropdown.module.css"
import { Arrow } from "../Arrow";

export function Dropdown(props: any) {
  const [value, setValue] = useState("halfyear");
  const [hiddenOptions, setHiddenOptions] = useState<string[]>([]);
  // для стрелки
  const [isActive, setIsActive] = useState(false);

  const handleToggleActive = () => {
    setIsActive(!isActive);
  };

  const handleChange = (selectedValue: string) => {
    // Убираю предыдушие options из массива со скрытыми
    setHiddenOptions((prevHiddenOptions) =>
      prevHiddenOptions.filter((option) => option !== value)
    );

    setValue(selectedValue);

    // Выбранная option в массив со скрытыми
    setHiddenOptions((prevHiddenOptions) => [...prevHiddenOptions, selectedValue]);

    props.childToParent(selectedValue);
  };

  // Скрываею выбранную опцию на загрузку компонента
  useEffect(() => {
    handleChange(value);
  }, []);

  const options = [
    { value: "halfyear", label: "За последние 6 месяцев" },
    { value: "month", label: "За последний месяц" },
    { value: "year", label: "За последний год" },
  ];


  return (
    <div className={styles.dropdown}>
      <select value={value} id="select"
        className={styles.select}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        onClick={handleToggleActive}
        onBlur={handleToggleActive}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            hidden={hiddenOptions.includes(option.value)}
            className={styles.option}
          >
            {option.label}
          </option>
        ))}
      </select>
      <Arrow className={`${styles.arrow} ${isActive ? styles.active : ''}`} />
    </div >
  )
}
