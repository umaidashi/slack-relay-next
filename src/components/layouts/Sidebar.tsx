import React from "react";
import styles from "@/styles/components/layouts/Sidebar.module.scss";
import { useRouter } from "next/router";

export default function Sidebar(props: any) {
  const channels = props.data.channels;
  const team = props.data.team;
  const router = useRouter();
  const channelId = router.query.channelId as string;

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
        <div className={styles.workspaceName}>{team ? team.name : ""}</div>
        <div className={styles.channelList}>
          {channels ? (
            <div>
              {channels.map((c: any) => (
                <div
                  className={`${styles.channelItem} ${
                    channelId === c.id && styles.selected
                  }`}
                  key={c.id}
                  onClick={() => goChannel(c.id)}
                >
                  <div className={styles.channelNameContainer}>
                    <div className={styles.icon}>
                      <svg>
                        <use
                          xlinkHref={"/icons/hashtag-light.svg#hashtag-light"}
                        />
                      </svg>
                    </div>
                    <div className={styles.channelName}>{c.name}</div>
                  </div>
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
