import { useRouter } from "next/router";
import React from "react";

export default function Message(props: any) {
  const message = props.data;
  const channelId = props.channelId;
  const router = useRouter();

  const elements: any[] = message.blocks?.[0].elements?.[0].elements;

  const goThread = (threadTs: string) => {
    router.push({
      pathname: `/`,
      query: { channelId: channelId, threadTs: threadTs },
    });
  };

  function revert(str: String) {
    {
      /* @ts-ignore */
    }
    // return str.replace(/&#(.*?);/g, "") => String.fromCodePoint(`0${p1}`));
    return str;
  }

  revert("&#x1f607;");

  return (
    <div>
      <div>
        {elements &&
          elements.map((e: any) => (
            <div>{e.type === "emoji" && <div>{revert(e.emoji)};</div>}</div>
          ))}
      </div>
      {message.thread_ts && (
        <button onClick={() => goThread(message.thread_ts)}>スレッド</button>
      )}
    </div>
  );
}
