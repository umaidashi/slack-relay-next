import { useRouter } from "next/router";
import React from "react";
import { DataType } from "../pages/Page";
import styles from "@/styles/components/layouts/Messages.module.scss";

export default function Messages(props: any) {
  const router = useRouter();

  const data: DataType = props.data;
  const channelId: string = props.channelId;

  const goThread = (threadTs: string) => {
    router.push({
      pathname: `/`,
      query: { channelId: channelId, threadTs: threadTs },
    });
  };

  return (
    <div className={styles.messagesContainer}>
      <div className={styles.messagesHeader}>
        <div className={styles.messagesHeaderInline}>
          <div className={styles.channelNameContaienr}>
            <span className={styles.channelIconContainer}>
            </span>
            <span className={styles.channelName}>
              {data.channels &&
                data.channels.find((d: any) => d.id === channelId)?.name}
            </span>
          </div>
          <div>メンバー</div>
        </div>
      </div>
      <div className={styles.messagesInfo}>info</div>
      <div className={styles.messagesBody}>
        {data.messages ? (
          <>
            {data.messages.map((m: any) => (
              <div key={m.ts}>
                <div>{m.text}</div>
                {m.thread_ts && (
                  <button onClick={() => goThread(m.thread_ts)}>
                    スレッド
                  </button>
                )}
              </div>
            ))}
          </>
        ) : (
          <>{channelId ? <>Loading</> : <>チャンネルを選択</>}</>
        )}
      </div>
    </div>
  );
}
