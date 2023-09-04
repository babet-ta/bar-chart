"use client"
import { useState } from "react";
import { BarGraph } from "../BarGraph/BarGraph";
import { Dropdown } from "../Dropdown/Dropdown";
import styles from "./DropdownGraphContainer.module.css"

export function DropdownGraphContainer() {
  const [data, setData] = useState('');

  const childToParent = (childdata: string) => {
    setData(childdata);
  }


  return (
    <div className={styles.wrapper}>
      <Dropdown childToParent={childToParent} />
      <BarGraph period={data} />
    </div>
  )
}