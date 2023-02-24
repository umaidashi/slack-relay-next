import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR from "swr";
import Sidebar from "../layouts/Sidebar";
import Layout from "../layouts/Layout";

const ENDPOINT = process.env.ENDPOINT;

export type DataType = {
  channels: { name: string }[];
  users: {}[];
  messages: {}[];
  members: {}[];
};

export default function Page() {
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
  } = useSWR<any>(channelId ? `${ENDPOINT}channel/${channelId}` : null, axios);

  const goThread = (threadTs: string) => {
    router.push({
      pathname: `/`,
      query: { channelId: channelId, ts: threadTs },
    });
  };
  const goChannel = (channelId: string) => {
    router.push({
      pathname: `/`,
      query: { channelId: channelId },
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

  console.log();

  return (
    <Layout data={data}>
      <div style={{ display: "flex" }}>
        <div>
          <h1>
            {data.channels &&
              data.channels.find((d: any) => d.id === channelId)?.name}
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column-reverse",
              paddingRight: "32px",
              borderRight: "1px solid #333333",
              marginRight: "32px",
            }}
          >
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
              <>Loading</>
            )}
          </div>
        </div>
        {replyTs && <Replies channelId={channelId} replyTs={replyTs} />}
      </div>
    </Layout>
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
