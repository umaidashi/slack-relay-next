import React from "react";
import styles from "@/styles/components/layouts/Layout.module.scss";
import Sidebar from "./Sidebar";
import { DataType } from "../pages/Page";

export default function Layout(props: any) {
  const data: DataType = props.data;
  const channels = data?.channels ? data.channels : [];
  return (
    <div className={styles.sidebarContainer}>
      <Sidebar data={channels} />
      {props.children}
    </div>
  );
}
