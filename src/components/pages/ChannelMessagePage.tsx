import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR from "swr";

const ENDPOINT = process.env.ENDPOINT;

type DataType = {
  channels: {}[];
  users: {}[];
  messages: {}[];
  members: {}[];
};

export default function ChannelMessagesPage() {
  const router = useRouter();
  const channelId = router.query.channelId as string;
  const replyTs = router.query.ts as string;

  const [data, setData] = useState<DataType>({
    channels: [],
    users: [],
    messages: [],
    members: [],
  });

  const {
    data: channelsData,
    error: channelError,
    isLoading: channelIsLoading,
  } = useSWR<any>(`${ENDPOINT}channel`, axios);

  const channels = channelsData?.data?.channels?.sort(function (
    a: any,
    b: any
  ) {
    return a.name < b.name ? -1 : 1; //オブジェクトの昇順ソート
  });

  const {
    data: users,
    error: usersError,
    isLoading: usersIsLoading,
  } = useSWR<any>(`${ENDPOINT}users`, axios);

  const {
    data: messages,
    error: messageError,
    isLoading: messageIsLoading,
  } = useSWR<any>(`${ENDPOINT}channel/${channelId}`, axios);

  const showThread = (threadTs: string) => {
    router.push({
      pathname: `/${channelId}`,
      query: { ts: threadTs },
    });
  };

  useEffect(() => {
    setData({
      channels: channels,
      users: users?.data.users,
      messages: messages?.data?.messages,
      members: messages?.data?.members,
    });
  }, [channels, messages, users]);

  useEffect(() => {
    console.log("changed data!!", data);
  });

  if (!data.messages) return <>loading</>;

  return (
    <>
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            paddingRight: "32px",
            borderRight: "1px solid #333333",
            marginRight: "32px",
          }}
        >
          {data.messages.map((m: any) => (
            <div key={m.ts}>
              <div>{m.text}</div>
              {m.thread_ts && (
                <button onClick={() => showThread(m.thread_ts)}>
                  スレッド
                </button>
              )}
            </div>
          ))}
        </div>
        {replyTs && <Replies channelId={channelId} replyTs={replyTs} />}
      </div>
    </>
  );
}

const Replies: React.FC<{ channelId: string; replyTs: string }> = ({
  channelId,
  replyTs,
}) => {
  const {
    data: replies,
    error: replyError,
    isLoading: replyIsLoading,
  } = useSWR<any>(`${ENDPOINT}channel/${channelId}/${replyTs}`, axios);

  if (!replies) return <>Loading</>;
  return (
    <div>
      {replies.data.replies.map((r: any) => (
        <div key={r.ts}>{r.text}</div>
      ))}
    </div>
  );
};
