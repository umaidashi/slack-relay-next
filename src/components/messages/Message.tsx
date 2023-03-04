import { useRouter } from "next/router";
import React from "react";
import { blocksToHTML } from "@/slack-mrkdwn/blocks";
import styles from "@/styles/components/messages/Message.module.scss";

export default function Message(props: any) {
  const message = props.data;
  const users = props.users;
  const isThread = props.isThread;
  const channelId = props.channelId;
  const router = useRouter();

  const elements: string = blocksToHTML(message.blocks as [], users);

  console.log(message.thread_ts && message);

  const author = users?.filter((user: any) => user.id === message.user)?.[0];

  const authorName = (author: any) => {
    return author?.profile?.real_name;
  };

  // console.log(users);

  const getDate = (ts: string) => {
    const today = new Date();
    const DATE = new Date(Number(ts) * 1000);
    console.log(DATE, DATE.getDate());
    const year = String(DATE.getFullYear());
    const month = String(DATE.getUTCMonth() + 1);
    const day = String(DATE.getDate());
    const date = DATE.getDay();
    const hours = String(DATE.getHours());
    const minutes = String(DATE.getMinutes());

    const diff = today.getTime() - DATE.getTime();
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diff / (1000 * 60 * 24));
    const diffMinutes = Math.floor(diff / (1000 * 24));

    let diffText = "";

    if (diffDays > 30) {
      diffText += `${Math.floor(diffDays / 30)}ヶ月前`;
    } else if (diffDays > 1) {
      diffText += `${diffDays}日前`;
    } else if (diffHours > 1) {
      diffText += `${diffHours}時間前`;
    } else {
      diffText += `${diffMinutes}分前`
    }

    const days = ["日", "月", "火", "水", "木", "金", "土"];

    return `${diffText} | ${year}/${month}/${day}(${
      days[date]
    }) ${hours}:${minutes.padStart(2, "0")}`;
    // return `${date.getHours()}:${date.getMinutes()}`;
  };

  const goThread = (threadTs: string) => {
    router.push({
      pathname: `/`,
      query: { channelId: channelId, threadTs: threadTs },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.messageContainer}>
        <div className={styles.author}>
          {author?.profile.image_original ? (
            <img
              className={styles.authorIcon}
              src={author?.profile.image_original}
              alt={author?.name}
            />
          ) : (
            <div className={styles.noAuthorIcon}>
              <svg>
                <use xlinkHref={"/icons/user.svg#user"} />
              </svg>
            </div>
          )}
        </div>
        <div className={styles.rightBox}>
          <div className={styles.authorInfo}>
            <span className={styles.authorName}>
              {authorName(author) ? authorName(author) : "loading..."}
            </span>
            <span className={styles.timestamp}>{getDate(message.ts)}</span>
          </div>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: elements }}
          ></div>
          {message.files && <div className={styles.files}>files</div>}
          {message.thread_ts && !isThread && (
            <div
              className={styles.threadButton}
              onClick={() => goThread(message.thread_ts)}
            >
              {author?.profile.image_original ? (
                <img
                  className={styles.replyUserIcon}
                  src={author?.profile.image_original}
                  alt={author?.name}
                />
              ) : (
                <div className={styles.noReplyUserIcon}>
                  <svg>
                    <use xlinkHref={"/icons/user.svg#user"} />
                  </svg>
                </div>
              )}
              <div className={styles.threadInfo}>
                {message.reply_count}件の返信
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
