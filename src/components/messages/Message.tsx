import { useRouter } from "next/router";
import React from "react";
import { blocksToHTML } from "@/slack-mrkdwn/blocks";

export default function Message(props: any) {
  const message = props.data;
  const users = props.users;
  const isThread = props.isThread;
  const channelId = props.channelId;
  const router = useRouter();

  const elements: string = blocksToHTML(message.blocks as [], users);

  const goThread = (threadTs: string) => {
    router.push({
      pathname: `/`,
      query: { channelId: channelId, threadTs: threadTs },
    });
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      <span dangerouslySetInnerHTML={{ __html: elements }}></span>
      {message.thread_ts && !isThread && (
        <div onClick={() => goThread(message.thread_ts)}>スレッド</div>
      )}
    </div>
  );
}
