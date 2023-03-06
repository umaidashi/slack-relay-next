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

  console.log(message.reactions);

  const author = users?.filter((user: any) => user.id === message.user)?.[0];

  const userCheck = (userId: string) => {
    return users?.filter((user: any) => user.id === userId)?.[0];
  };

  const authorName = (author: any) => {
    return author?.profile?.real_name;
  };

  // console.log(users);

  const getDate = (ts: string, onlyDiff?: boolean) => {
    const today = new Date();
    const DATE = new Date(Number(ts) * 1000);
    const year = String(DATE.getFullYear());
    const month = String(DATE.getUTCMonth() + 1);
    const day = String(DATE.getDate());
    const date = DATE.getDay();
    const hours = String(DATE.getHours());
    const minutes = String(DATE.getMinutes());

    const diff = today.getTime() - DATE.getTime();
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diff / (1000 * 60));

    let diffText = "";

    if (diffDays > 30) {
      diffText += `${Math.floor(diffDays / 30)}ヶ月前`;
    } else if (diffDays < 30 && diffHours >= 24) {
      diffText += `${diffDays}日前`;
    } else if (diffHours < 24) {
      diffText += `${diffHours}時間前`;
    } else if (diffMinutes < 60) {
      diffText += `${diffMinutes}分前`;
    }

    const days = ["日", "月", "火", "水", "木", "金", "土"];

    if (onlyDiff) {
      return diffText;
    } else {
      return `${diffText} | ${year}/${month}/${day}(${
        days[date]
      }) ${hours}:${minutes.padStart(2, "0")}`;
    }
  };

  const goThread = (threadTs: string) => {
    router.push({
      pathname: `/`,
      query: { channelId: channelId, threadTs: threadTs },
    });
  };

  const goUser = (userId: string) => {
    router.push({
      pathname: `/`,
      query: { userId: userId },
    });
  };

  return (
    <div className={styles.container}>
      {message.root && isThread && (
        <div className={styles.root}>　　　#チャンネルにも投稿済み</div>
      )}
      <div className={styles.messageContainer}>
        <div className={styles.author}>
          {author?.profile.image_original ? (
            <img
              className={styles.authorIcon}
              src={author?.profile.image_original}
              alt={author?.name}
              onClick={() => goUser(author?.id)}
            />
          ) : (
            <div
              className={styles.noAuthorIcon}
              onClick={() => goUser(author?.id)}
            >
              <svg>
                <use xlinkHref={"/icons/user.svg#user"} />
              </svg>
            </div>
          )}
        </div>
        <div className={styles.rightBox}>
          <div className={styles.authorInfo}>
            <span
              className={styles.authorName}
              onClick={() => goUser(author?.id)}
            >
              {authorName(author) ? authorName(author) : "loading..."}
            </span>
            <span className={styles.timestamp}>{getDate(message.ts)}</span>
          </div>
          {message.root && !isThread && (
            <div className={styles.root}>
              このスレッドに返信しました：
              <span className={styles.rootMessage}>{message.root.text}</span>
            </div>
          )}
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: elements }}
          ></div>
          {message.files && <div className={styles.files}>files</div>}
          {message.reaction && <div>hoge</div>}
          {message.thread_ts && !isThread && !message.root && (
            <div
              className={styles.threadButton}
              onClick={() => goThread(message.thread_ts)}
            >
              <div className={styles.replyUserIconContainer}>
                {[
                  ...Array(
                    message.reply_users?.length < 3
                      ? message.reply_users?.length
                      : 3
                  ),
                ].map((_: any, i: number) => (
                  <div key={i}>
                    {userCheck(message.reply_users?.[i])?.profile
                      .image_original ? (
                      <img
                        className={styles.replyUserIcon}
                        src={
                          userCheck(message.reply_users?.[i]).profile
                            .image_original
                        }
                        alt={userCheck(message.reply_users?.[i]).name}
                      />
                    ) : (
                      <div className={styles.noReplyUserIcon}>
                        <svg>
                          <use xlinkHref={"/icons/user.svg#user"} />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className={styles.threadInfo}>
                {message.reply_count}件の返信
              </div>
              <div className={styles.timestamp}>
                最終返信: {getDate(message.latest_reply, true)}
              </div>
              <div className={styles.openButton}>
                <svg>
                  <use xlinkHref={"/icons/right.svg#right"} />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
