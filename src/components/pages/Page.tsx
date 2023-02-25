import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR from "swr";
import Layout from "../layouts/Layout";
import Messages from "../layouts/Messages";
import Replies from "../layouts/Replies";

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
  const threadTs = router.query.thread_ts as string;

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

  return (
    <Layout data={data}>
      <Messages data={data} channelId={channelId} />
      {threadTs && <Replies channelId={channelId} threadTs={threadTs} />}
    </Layout>
  );
}
