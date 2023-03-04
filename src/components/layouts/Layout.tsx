import React, { useEffect, useState } from "react";
import styles from "@/styles/components/layouts/Layout.module.scss";
import Sidebar from "./Sidebar";
import { DataType } from "../pages/Page";

const PASS = process.env.PASS;

export default function Layout(props: any) {
  const [auth, setAuth] = useState<boolean>(true);
  const data: DataType = props.data;

  useEffect(() => {
    if (!auth) {
      const result = window.prompt("password");
      if (result === PASS) {
        setAuth(true);
      } else {
        alert("パスワードが違います。");
      }
    }
  }, []);
  return (
    <>
      {auth ? (
        <div className={styles.container}>
          <>
            <div className={styles.header}>Slack log viewer ver.2</div>
            <div className={styles.body}>
              <Sidebar data={data} />
              {props.children}
            </div>
          </>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
