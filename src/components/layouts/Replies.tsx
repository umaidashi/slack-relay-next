import React from "react";
import useSWR from "swr";
import axios from "axios";
import styles from "@/styles/components/layouts/Replies.module.scss";
import { useRouter } from "next/router";

const ENDPOINT = process.env.ENDPOINT;

export default function Replies(props: any) {
  const router = useRouter();
  const { channelId, threadTs, data } = props;
  const {
    data: replies,
    error: replyError,
    isLoading: replyIsLoading,
  } = useSWR<any>(
    channelId && threadTs
      ? `${ENDPOINT}channel/${channelId}/${threadTs}`
      : null,
    axios
  );

  const closeThread = () => {
    router.push({
      pathname: `/`,
      query: { channelId: channelId },
    });
  };

  return (
    <div className={styles.repliesContainer}>
      <div className={styles.repliesHeader}>
        <div className={styles.repliesHeaderInline}>
          <div className={styles.leftContainer}>
            <div className={styles.repliesText}>スレッド</div>
            <div className={styles.channelName}>
              {data.channels &&
                data.channels.find((d: any) => d.id === channelId)?.name}
            </div>
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.closeButton} onClick={closeThread}>
              閉じる
            </div>
          </div>
        </div>
      </div>
      {replies ? (
        <div className={styles.repliesBody}>
          {replies.data.replies.map((r: any) => (
            <div key={r.ts}>{r.text}</div>
          ))}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
