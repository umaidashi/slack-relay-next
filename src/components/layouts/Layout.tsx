import React from "react";
import styles from "@/styles/components/layouts/Layout.module.scss";
import Sidebar from "./Sidebar";
import { DataType } from "../pages/Page";

export default function Layout(props: any) {
  const data: DataType = props.data;
  return (
    <div className={styles.container}>
      <div className={styles.header}>Slack log viewer ver.2</div>
      <div className={styles.body}>
        <Sidebar data={data} />
        {props.children}
      </div>
    </div>
  );
}
