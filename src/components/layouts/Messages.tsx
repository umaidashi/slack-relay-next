import { useRouter } from "next/router";
import React from "react";
import { DataType } from "../pages/Page";

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
    <div>
      <h1>
        {data.channels &&
          data.channels.find((d: any) => d.id === channelId)?.name}
      </h1>
      <div>
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
          <>
          {channelId ? (<>Loading</>) : (<>チャンネルを選択</>)}
          </>
        )}
      </div>
    </div>
  );
}
