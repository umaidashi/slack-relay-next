import React from "react";
import useSWR from "swr";
import axios from "axios";
import styles from "@/styles/components/layouts/Replies.module.scss";
import { useRouter } from "next/router";
import Message from "../messages/Message";

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
            <div className={styles.channelNameContainer}>
              <div className={styles.icon}>
                <svg>
                  <use xlinkHref={"/icons/hashtag-light.svg#hashtag-light"} />
                </svg>
              </div>
              <div className={styles.channelName}>
                {data.channels &&
                  data.channels.find((d: any) => d.id === channelId)?.name}
              </div>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.closeButton} onClick={closeThread}>
              <svg>
                <use xlinkHref={"/icons/xmark.svg#xmark"} />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.repliesBody}>
        {replies ? (
          <div>
            {replies.data.replies.map((r: any) => (
              <Message
                key={r.ts}
                data={r}
                users={data.users}
                channelId={channelId}
                isThread={true}
              />
            ))}
          </div>
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
}
