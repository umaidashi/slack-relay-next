import React from "react";
import styles from "@/styles/components/layouts/Layout.module.scss";
import Sidebar from "./Sidebar";
import { DataType } from "../pages/Page";

export default function Layout(props: any) {
  const data: DataType = props.data;
  return (
    <div className={styles.container}>
      <div className={styles.header}>Header</div>
      <div className={styles.body}>
        <Sidebar data={data.channels} />
        {props.children}
      </div>
    </div>
  );
}
