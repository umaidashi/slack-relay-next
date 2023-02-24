import React from "react";
import styles from "@/styles/components/layouts/Sidebar.module.scss";
import { useRouter } from "next/router";

export default function Sidebar(props: any) {
  const data = props.data;
  const router = useRouter();
  if (!data) return <>Loading</>;

  const goChannel = (channelId: string) => {
    router.push({
      pathname: `/`,
      query: { channelId: channelId },
    });
  };

  return (
    <div className={styles.sidebarContainer}>
      {data.map((d: any) => (
        <div key={d.id} onClick={() => goChannel(d.id)}>{d.name}</div>
      ))}
    </div>
  );
}
