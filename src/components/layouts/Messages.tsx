import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { DataType } from "../pages/Page";
import styles from "@/styles/components/layouts/Messages.module.scss";
import Message from "@/components/messages/Message";
import { channel } from "diagnostics_channel";

export default function Messages(props: any) {
  const data: DataType = props.data;
  const channelId: string = props.channelId;

  // スクロール下固定
  const ref = useRef<HTMLDivElement>(null);
  const toBottom = () => {
    ref?.current?.scrollIntoView();
  };
  const [refTiming, setRefTiming] = useState({
    isFirst: true,
    lastChannelId: channelId,
  });
  if (data.messages !== undefined && data?.messages?.length !== 0) {
    if (refTiming.isFirst) {
      setRefTiming({ isFirst: false, lastChannelId: channelId });
    }
  }
  useEffect(() => {
    if (channelId !== refTiming.lastChannelId) {
      setRefTiming({ isFirst: true, lastChannelId: channelId });
    }
    toBottom();
  }, [refTiming.isFirst, channelId]);

  return (
    <div className={styles.messagesContainer}>
      <div className={styles.messagesHeader}>
        <div className={styles.messagesHeaderInline}>
          <div className={styles.channelNameContaienr}>
            <div className={styles.icon}>
              <svg>
                <use xlinkHref={"/icons/hashtag.svg#hashtag"} />
              </svg>
            </div>
            <div className={styles.channelName}>
              {data.channels &&
                data.channels.find((d: any) => d.id === channelId)?.name}
            </div>
          </div>
          <div>メンバー</div>
        </div>
      </div>
      {/* <div className={styles.messagesInfo}>info</div> */}
      <div className={styles.toLatestMessage} onClick={toBottom}>
        最新メッセージ
      </div>
      <div className={styles.messagesBody}>
        {data.messages ? (
          <>
            {data.messages.map((m: any) => (
              <Message
                key={m.ts}
                data={m}
                users={data.users}
                channelId={channelId}
              />
            ))}
            <div ref={ref}></div>
          </>
        ) : (
          <>{channelId ? <>Loading</> : <>チャンネルを選択</>}</>
        )}
      </div>
    </div>
  );
}
