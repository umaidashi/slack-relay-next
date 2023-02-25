import React from "react";
import styles from "@/styles/components/layouts/Sidebar.module.scss";
import { useRouter } from "next/router";

export default function Sidebar(props: any) {
  const channels = props.data;
  const router = useRouter();

  const goChannel = (channelId: string) => {
    router.push({
      pathname: `/`,
      query: { channelId: channelId },
    });
  };

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.sidebarLeft}>
        <div className={styles.workspaceList}>
          <div className={styles.workspaceItem}></div>
          <div className={styles.workspaceItem}></div>
          <div className={styles.workspaceItem}></div>
        </div>
      </div>
      <div className={styles.sidebarRight}>
        <div className={styles.workspaceName}>ワークスペース名</div>
        <div className={styles.channelList}>
          {channels ? (
            <div>
              {channels.map((c: any) => (
                <div
                  className={styles.channelItem}
                  key={c.id}
                  onClick={() => goChannel(c.id)}
                >
                  <span className={styles.channelName}>{c.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <div>Loading</div>
          )}
        </div>
      </div>
    </div>
  );
}
